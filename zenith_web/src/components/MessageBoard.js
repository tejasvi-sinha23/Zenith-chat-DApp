import React, { useEffect, useRef } from "react";


const MessageBoard = ({ friend, myAddress, messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-board">
      <div className="chat-header">
        <h3>{friend.name}</h3>
        <p>{friend.address.slice(0, 8)}…</p>
      </div>

      <div className="messages-container">
        {messages.map((msg, i) => {
          const isMine = msg.sender === myAddress;
          return (
            <div
              key={i}
              className={`message-bubble ${isMine ? "sent" : "received"}`}
            >
              <div className="message-text">{msg.text}</div>
              <div className="message-time">
                {new Date(msg.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessageBoard;
