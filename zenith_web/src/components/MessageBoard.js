import React, { useEffect, useRef } from "react";

const MessageBoard = ({ messages = [], friend, myAddress }) => {
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="message-board">
      <div className="chat-header">
        <h2>{friend?.name || "Unknown"}</h2>
        <small>
          {friend?.address
            ? friend.address.slice(0, 6) + "..." + friend.address.slice(-4)
            : ""}
        </small>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <p className="no-msg">No messages yet.</p>
        ) : (
          messages.map((m, i) => (
            <div
              key={`${m.sender}-${i}`}
              className={`message-bubble ${
                m.sender === myAddress ? "sent" : "received"
              }`}
            >
              <p>{m.text}</p>
              <span className="time">{m.time}</span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageBoard;
