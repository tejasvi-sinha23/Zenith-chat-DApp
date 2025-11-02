const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  socket.on("joinRoom", (wallet) => {
    socket.join(wallet);
    console.log(`🏠 ${wallet} joined their room`);
  });

  socket.on("sendMessage", (data) => {
    const { sender, recipient, text } = data;
    console.log("📤", sender, "→", recipient, ":", text);
    io.to(recipient).emit("receiveMessage", data);
    io.to(sender).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(4000, () => console.log("🚀 Socket backend running on port 4000"));
