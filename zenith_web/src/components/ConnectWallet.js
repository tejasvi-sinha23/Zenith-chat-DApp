import React, { useState } from "react";
import { isConnected, getNetworkDetails, requestAccess } from "@stellar/freighter-api";

function ConnectWallet({ onConnect }) {
  const [publicKey, setPublicKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setLoading(true);

      // 1️⃣ Check if Freighter is installed
      const isExtConnected = await isConnected();
      if (!isExtConnected) {
        alert("❌ Freighter not detected. Please install the Freighter extension.");
        return;
      }

      // 2️⃣ Verify network (must be TESTNET)
      const { network } = await getNetworkDetails();
      if (network !== "TESTNET") {
        alert("⚠️ Please switch Freighter to the TESTNET network.");
        return;
      }

      // 3️⃣ Request wallet access
      const access = await requestAccess();
      const address = access?.address || access?.publicKey;

      if (!address) {
        alert("⚠️ Unable to fetch Freighter public key.");
        return;
      }

      // 4️⃣ Save public key and notify parent (App.js)
      setPublicKey(address);
      onConnect?.(address);

    } catch (err) {
      console.error("🚨 Freighter connect error:", err);
      alert("Wallet connection failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#0d1117",
        color: "#c9d1d9",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 0 15px rgba(0,0,0,0.5)",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#58a6ff" }}>🔗 Connect to Freighter</h2>

      {publicKey ? (
        <p style={{ color: "#3fb950" }}>
          ✅ Connected: <b>{publicKey.slice(0, 8)}...</b>
        </p>
      ) : (
        <button
          onClick={connectWallet}
          disabled={loading}
          style={{
            background: loading ? "#30363d" : "#238636",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Connecting..." : "Connect Freighter Wallet"}
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;
