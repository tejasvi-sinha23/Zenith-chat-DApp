import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ConnectWallet from "./components/ConnectWallet";
import FriendList from "./components/FriendList";
import MessageBoard from "./components/MessageBoard";
import SendMessage from "./components/SendMessage";
import "./styles.css";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  reconnection: true,
});

function App() {
  const [address, setAddress] = useState(null);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({}); // { friendAddress: [ { sender, text, time } ] }

  // Join socket room after wallet connects
  useEffect(() => {
    if (!address) return;

    socket.emit("joinRoom", address);
    console.log("🟢 Joined socket room:", address);

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      console.log("📩 New message received:", data);

      setMessages((prev) => ({
        ...prev,
        [data.sender]: [...(prev[data.sender] || []), data],
      }));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [address]);

  // Send message to another wallet
  const handleSend = (text) => {
    if (!selectedFriend) return alert("Select a friend to chat with!");
    if (!text.trim()) return;

    const newMessage = {
      sender: address,
      recipient: selectedFriend.address,
      text,
      time: new Date().toLocaleTimeString(),
    };

    // Emit through socket
    socket.emit("sendMessage", newMessage);
    console.log("📤 Sending message:", newMessage);

    // Update local chat immediately
    setMessages((prev) => ({
      ...prev,
      [selectedFriend.address]: [
        ...(prev[selectedFriend.address] || []),
        newMessage,
      ],
    }));
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
