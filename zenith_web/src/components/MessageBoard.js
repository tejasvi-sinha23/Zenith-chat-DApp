import React from "react";

const MessageBoard = ({ messages, friend, myAddress }) => {
  return (
    <div className="message-board">
      <div className="chat-header">
        <h2>{friend.name}</h2>
        <small>{friend.address.slice(0, 8)}...</small>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <p className="no-msg">No messages yet.</p>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`message-bubble ${
                m.sender === myAddress ? "sent" : "received"
              }`}
            >
              <p>{m.text}</p>
              <span className="time">{m.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
