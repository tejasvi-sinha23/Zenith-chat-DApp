import React, { useState } from "react";

const SendMessage = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="send-box">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default SendMessage;
