import React, { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import FriendList from "./components/FriendList";
import MessageBoard from "./components/MessageBoard";
import SendMessage from "./components/SendMessage";
import "./styles.css";

function App() {
  const [address, setAddress] = useState(null);
  const [friends, setFriends] = useState([]); // e.g., [{ name: "Alice", address: "GABC..." }]
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({}); // { friendAddress: [ { sender, text, time } ] }

  const handleSend = (text) => {
    if (!selectedFriend) {
      alert("Select a friend to chat with!");
      return;
    }

    if (!text.trim()) return;

    const newMessage = {
      sender: address,
      text,
      time: new Date().toLocaleTimeString(),
    };

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

      {/* Connect Wallet Section */}
      <ConnectWallet onConnect={setAddress} />

      {address && (
        <div className="chat-layout">
          {/* Friend List Section */}
          <FriendList
            friends={friends}
            setFriends={setFriends}
            onSelectFriend={setSelectedFriend}
            selectedFriend={selectedFriend}
            messages={messages}
          />

          {/* Chat Window Section */}
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
              <div className="no-chat">
                👈 Select a friend to start chatting
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
