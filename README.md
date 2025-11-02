
# 💬 **Zenith Chat — Stellar Freighter Wallet + Soroban Smart Contract Messenger**

Zenith Chat is a **decentralized chat DApp** built with **React + Express + Soroban**, using the **Stellar Freighter Wallet** for secure authentication and on-chain identity.
Users can connect their wallet, access chatrooms, and exchange messages — all tied to their **Stellar Testnet public keys**.
Messages can optionally be stored or verified **on-chain** via a **Soroban smart contract**.

---

## 🚀 **Features**

### 🔗 **Freighter Wallet Integration**

* Secure login using **Freighter Wallet (Testnet)**
* Automatic **Stellar network verification**
* Public key acts as your unique identity

### 💬 **Cross-Wallet Chatrooms**

* Chat using **Stellar public keys**
* Conversations are wallet-to-wallet based

### ⚡ **Real-Time Messaging (Socket.io)**

* Instant message delivery
* WebSocket-powered backend with Socket.io

### 🔐 **Soroban Smart Contract Integration**

* Record or verify message metadata **on-chain**
* Verifiable **ownership and timestamp**
* Contract deployed on **Stellar Testnet**

### 🌐 **Fullstack DApp Architecture**

| Layer              | Technology                              |
| ------------------ | --------------------------------------- |
| **Frontend**       | React (Vite) + Axios + Socket.io-client |
| **Backend**        | Node.js + Express + Socket.io           |
| **Smart Contract** | Soroban (Rust)                          |
| **Wallet**         | Stellar Freighter                       |
| **Blockchain**     | Stellar Testnet                         |
| **Styling**        | Custom CSS / Tailwind                   |

---

## 📄 **Smart Contract Details**

| Property          | Value                                                      |
| ----------------- | ---------------------------------------------------------- |
| **Contract Name** | `contract`                                                 |
| **Language**      | Rust (Soroban)                                             |
| **Network**       | Stellar Testnet                                            |
| **Contract ID**   | `CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE` |

![Soroban Contract Explorer](contract/contract%20explorer.jpeg)

---

### 🧠 **Key Functions**

| Function                                   | Description                                       |
| ------------------------------------------ | ------------------------------------------------- |
| `store_message(sender, receiver, message)` | Saves encrypted or plain message data on-chain    |
| `get_messages(address)`                    | Retrieves all messages for a given wallet address |

---

### 🔧 **Example Invocation**

```bash
soroban invoke \
  --id CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE \
  --fn store_message \
  --arg sender:GDRXRA4SBGJS7MUL22DK3ZGL34FKEDE6KV2NEAPMEEN7XW2R5JEG4CJS \
  --arg receiver:GBZJXU4WBMBQOGP6KFN7J43OAFIYXL2C2H2VSCAXUB54JQ5G2A5GBQJN \
  --arg message:"Hey there from Zenith!"
```

---

## 📁 **Project Structure**

```bash
zenith-dapp/
├── zenith_web/              # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConnectWallet.js
│   │   │   ├── FriendList.js
│   │   │   ├── MessageBoard.js
│   │   │   └── SendMessage.js
│   │   ├── App.js
│   │   └── styles.css
│   ├── package.json
│   └── build/               # Production build output
│
├── backend/                 # Express Backend + Socket.io
│   ├── server.js
│   ├── package.json
│   └── routes/
│
└── contract/                # Soroban Smart Contract (Rust)
    ├── Cargo.toml
    ├── src/lib.rs
    └── target/
```

---

## ⚙️ **Installation & Setup**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tejasvi-sinha23/Zenith-chat-DApp.git
cd Zenith-chat-DApp
```

### 2️⃣ Install Frontend Dependencies

```bash
cd zenith_web
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## 💻 **Running Locally**

### 🖥️ Start Backend

```bash
cd backend
node server.js
```

Backend runs at 👉 **[http://localhost:4000](http://localhost:4000)**

### 🌐 Start Frontend

```bash
cd ../zenith_web
npm start
```

Frontend runs at 👉 **[http://localhost:3000](http://localhost:3000)**



## 🔑 **Connect Your Freighter Wallet**

1. Install the **Freighter Wallet** browser extension
2. Open Freighter → Go to **Settings → Switch Network → Testnet**
3. Open the Zenith Chat app → Click **"Connect Freighter Wallet"**
4. Your connected public key will appear
5. Start chatting securely with other Stellar users 🎉



## 📡 **API Endpoints**

| Method   | Endpoint                 | Description                              |
| -------- | ------------------------ | ---------------------------------------- |
| **GET**  | `/api/messages/:address` | Fetches all messages for a given address |
| **POST** | `/api/send`              | Sends a message to a recipient           |

### 🧩 Example Request

```json
{
  "sender": "GDRXRA4SBGJS7MUL22DK3ZGL34FKEDE6KV2NEAPMEEN7XW2R5JEG4CJS",
  "recipient": "GBZJXU4WBMBQOGP6KFN7J43OAFIYXL2C2H2VSCAXUB54JQ5G2A5GBQJN",
  "text": "Hey there!"
}
```



## 🧱 **Building for Production**

### Build Frontend

```bash
cd zenith_web
npm run build
```

### Serve with Backend

```bash
cd ../backend
node server.js
```

Your full DApp will now be served at 👉 **[http://localhost:4000](http://localhost:4000)**


## 🧠 **Future Improvements**

* ✉️ **End-to-end message encryption** before on-chain registration
* 🧩 **Permanent decentralized storage** via IPFS
* 🔍 **Friend discovery** using Stellar memo hashes
* 📜 **On-chain message proof** verification through Soroban



## 👨‍💻 **Author**

**Tejasvi Sinha**
🌐 Network: **Stellar Testnet**
📜 Contract ID: **CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE**
💬 Project: **Zenith Chat DApp**




