import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ConnectWallet from "./components/ConnectWallet";
import FriendList from "./components/FriendList";
import MessageBoard from "./components/MessageBoard";
import SendMessage from "./components/SendMessage";
import "./styles.css";

// Connect to backend WebSocket
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  reconnection: true,
});

function App() {
  const [address, setAddress] = useState(null);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({}); // { friendAddress: [ { sender, text, time } ] }

  // When wallet connects → join room & load history
  useEffect(() => {
    if (!address) return;

    socket.emit("joinRoom", address);
    console.log("🟢 Joined socket room:", address);

    // 🔹 Fetch chat history from backend
    fetch(`http://localhost:4000/api/messages/${address}`)
      .then((res) => res.json())
      .then((data) => {
        const organized = {};
        data.forEach((msg) => {
          const other =
            msg.sender === address ? msg.recipient : msg.sender;
          if (!organized[other]) organized[other] = [];
          organized[other].push(msg);
        });
        setMessages(organized);
        console.log("🗂️ Loaded chat history:", organized);
      })
      .catch((err) => console.error("❌ History fetch failed:", err));

    // 🔹 Listen for real-time incoming messages
    socket.on("receiveMessage", (data) => {
      console.log("📩 New message received:", data);

      setMessages((prev) => {
        const otherWallet =
          data.sender === address ? data.recipient : data.sender;
        return {
          ...prev,
          [otherWallet]: [...(prev[otherWallet] || []), data],
        };
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [address]);

  // 🔹 Send message handler
  const handleSend = (text) => {
    if (!selectedFriend) return alert("Select a friend to chat with!");
    if (!text.trim()) return;

    const newMessage = {
      sender: address,
      recipient: selectedFriend.address,
      text,
      time: new Date().toISOString(),
    };

    // Emit via WebSocket
    socket.emit("sendMessage", newMessage);
    console.log("📤 Sending message:", newMessage);

    // Store locally and optimistically render
    setMessages((prev) => ({
      ...prev,
      [selectedFriend.address]: [
        ...(prev[selectedFriend.address] || []),
        newMessage,
      ],
    }));

    // 🔹 Save message to backend (PostgreSQL)
    fetch("http://localhost:4000/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    }).catch((err) => console.error("❌ Failed to store message:", err));
  };

  return (
    <div className="app">
      <h1>💬 Zenith Chat</h1>
      

      <ConnectWallet onConnect={setAddress} />

      <h2>Now chat with friends on Zenith!</h2>
      

      {address && (
        <div className="chat-layout">
          <FriendList
            friends={friends}
            setFriends={setFriends}
            onSelectFriend={setSelectedFriend}
            selectedFriend={selectedFriend}
            messages={messages}
          />

          <div className="chat-window">
            {selectedFriend ? (
              <>
                <MessageBoard
                  friend={selectedFriend}
                  myAddress={address}
                  messages={messages[selectedFriend.address] || []}
                />
                <SendMessage onSend={handleSend} />
              </>
            ) : (
              <div className="no-chat">👈 Select a friend to start chatting</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
