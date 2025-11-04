// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db"); // PostgreSQL pool

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// ✅ Fetch all messages between two users
app.get("/api/messages/:address/:friend", async (req, res) => {
  const { address, friend } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM messages 
       WHERE (sender = $1 AND recipient = $2)
          OR (sender = $2 AND recipient = $1)
       ORDER BY time ASC`,
      [address, friend]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).send("Server Error");
  }
});

// ✅ Store new message
app.post("/api/send", async (req, res) => {
  const { sender, recipient, text } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO messages (sender, recipient, text)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [sender, recipient, text]
    );

    const newMessage = result.rows[0];

    // Emit to both users in real-time
    io.to(sender).emit("receiveMessage", newMessage);
    io.to(recipient).emit("receiveMessage", newMessage);

    res.status(200).json(newMessage);
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).send("Server Error");
  }
});

// ✅ WebSocket handling
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("joinRoom", (wallet) => {
    socket.join(wallet);
    console.log(`🏠 ${wallet} joined their room`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(4000, () =>
  console.log("🚀 Socket + Express backend running on port 4000")
);
