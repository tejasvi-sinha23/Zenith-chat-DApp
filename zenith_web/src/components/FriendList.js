import React, { useState } from "react";

const FriendList = ({ friends, setFriends, onSelectFriend, selectedFriend, messages }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const addFriend = () => {
    if (!name || !address) return;
    // prevent duplicates
    if (friends.some(f => f.address === address)) return alert("Friend already added!");
    setFriends([...friends, { name, address }]);
    setName("");
    setAddress("");
  };

  return (
    <div className="friend-list">
      <h3>Chats</h3>
      <div className="friends">
        {friends.length === 0 && <p className="no-friends">No friends added yet</p>}
        {friends.map((f, i) => {
          const msgCount = (messages[f.address]?.length || 0);
          return (
            <div
              key={i}
              className={`friend-item ${selectedFriend?.address === f.address ? "active" : ""}`}
              onClick={() => onSelectFriend(f)}
            >
              <div className="friend-avatar">{f.name.charAt(0).toUpperCase()}</div>
              <div className="friend-info">
                <strong>{f.name}</strong>
                <p>{f.address.slice(0, 6)}…</p>
              </div>
              {msgCount > 0 && <span className="unread">{msgCount}</span>}
            </div>
          );
        })}
      </div>

      <div className="add-friend">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Wallet Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={addFriend}>➕ Add</button>
      </div>
    </div>
  );
};

export default FriendList;
