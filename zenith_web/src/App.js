import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ConnectWallet from "./components/ConnectWallet";
import FriendList from "./components/FriendList";
import MessageBoard from "./components/MessageBoard";
import SendMessage from "./components/SendMessage";
import "./styles.css";

const socket = io("http://localhost:4000");

function App() {
  const [address, setAddress] = useState(null);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({});

  // ✅ Connect wallet to socket room
  useEffect(() => {
    if (address) {
      socket.emit("joinRoom", address);
      console.log("🟢 Joined socket room:", address);
    }
  }, [address]);

  // ✅ Listen for messages
  useEffect(() => {
  socket.on("receiveMessage", (data) => {
  console.log("📩 New message received:", data);
  const { sender, recipient, text, time } = data;

  // Determine which address this chat belongs to
  const chatKey = sender === address ? recipient : sender;

  setMessages((prev) => ({
    ...prev,
    [chatKey]: [...(prev[chatKey] || []), { sender, text, time }]
  }));
});


    return () => socket.off("receiveMessage");
  }, [address]);

  // ✅ Send message through socket
  const handleSend = (text) => {
    if (!selectedFriend) return alert("Select a friend first!");
    if (!text.trim()) return;

    const messageData = {
      sender: address,
      recipient: selectedFriend.address,
      text,
      time: new Date().toLocaleTimeString()
    };

    console.log("📤 Sending message:", messageData);
    socket.emit("sendMessage", messageData);
  };

  return (
    <div className="app">
      <h1>💬 Zenith Chat</h1>

      <ConnectWallet onConnect={setAddress} />

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
