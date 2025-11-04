---

# 💬 **Zenith Chat — Stellar Freighter Wallet + Soroban Smart Contract Messenger**

Zenith Chat is a **hybrid decentralized chat DApp** built with **React + Express + Soroban**, integrated with **PostgreSQL** for message storage and **Stellar Freighter Wallet** for authentication and identity.
Users connect their wallets, chat wallet-to-wallet in real time, and messages can optionally be **verified or recorded on-chain** through a **Soroban smart contract**.

---

## 🚀 **Features**

### 🔗 **Freighter Wallet Integration**

* Secure authentication via **Freighter Wallet (Testnet)**
* Automatic **network verification**
* Connected **Stellar public key** acts as your on-chain identity

### 💬 **Cross-Wallet Chatrooms**

* Send and receive messages via **Stellar public keys**
* Each chatroom is uniquely tied to wallet pairs

### ⚡ **Real-Time Messaging (Socket.io)**

* Instant two-way message delivery via **WebSockets**
* Real-time sync between users on **Node.js + Socket.io**

### 🧩 **Persistent Message Storage (PostgreSQL)**

* All chat messages are stored securely in a **PostgreSQL database**
* Enables message history and synchronization between sessions
* Acts as an **off-chain layer** complementing Soroban for metadata verification

### 🔐 **Soroban Smart Contract Integration**

* Store or verify message proofs **on-chain**
* Ensures verifiable **ownership + timestamp**
* Deployed on **Stellar Testnet**

---

## 🌐 **Fullstack DApp Architecture**

| Layer              | Technology                              |
| ------------------ | --------------------------------------- |
| **Frontend**       | React (Vite) + Axios + Socket.io-client |
| **Backend**        | Node.js + Express + Socket.io           |
| **Database**       | PostgreSQL (persistent message storage) |
| **Smart Contract** | Soroban (Rust)                          |
| **Wallet**         | Stellar Freighter                       |
| **Blockchain**     | Stellar Testnet                         |
| **Styling**        | Custom CSS / Tailwind                   |

---

## 🧱 **PostgreSQL Integration**

### 📦 Database Setup

1. **Start PostgreSQL service**

   * On Windows:

     ```powershell
     net start postgresql-x64-17
     ```

2. **Access psql shell**

   ```bash
   psql -U postgres
   ```

3. **Create database and table**

   ```sql
   CREATE DATABASE zenith_chat;
   \c zenith_chat;

   CREATE TABLE messages (
     id SERIAL PRIMARY KEY,
     sender TEXT NOT NULL,
     recipient TEXT NOT NULL,
     text TEXT NOT NULL,
     time TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Configure connection** in `backend/db.js`:

   ```js
   const { Pool } = require("pg");

   const pool = new Pool({
     user: "postgres",
     host: "localhost",
     database: "zenith_chat",
     password: "YOUR_PASSWORD",
     port: 5432,
   });

   module.exports = pool;
   ```

5. **Test connection**
   When you run the backend (`node index.js`), you should see:

   ```
   ✅ PostgreSQL connected
   🚀 Socket + Express backend running on port 4000
   ```

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

### 🧠 **Key Smart Contract Functions**

| Function                                   | Description                                     |
| ------------------------------------------ | ----------------------------------------------- |
| `store_message(sender, receiver, message)` | Stores encrypted or plain message data on-chain |
| `get_messages(address)`                    | Retrieves on-chain messages for a given wallet  |

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
│   └── build/
│
├── backend/                 # Express + Socket.io + PostgreSQL
│   ├── index.js
│   ├── db.js
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

### 1️⃣ Clone Repository

```bash
git clone https://github.com/tejasvi-sinha23/Zenith-chat-DApp.git
cd Zenith-chat-DApp
```

### 2️⃣ Install Dependencies

```bash
cd zenith_web
npm install
cd ../backend
npm install
```

---

## 💻 **Run the Application**

### 🖥️ Start PostgreSQL Server

```bash
net start postgresql-x64-17
```

### 🧩 Start Backend (Express + Socket.io + PostgreSQL)

```bash
cd backend
node index.js
```

✅ Runs on **[http://localhost:4000](http://localhost:4000)**

### 🌐 Start Frontend

```bash
cd ../zenith_web
npm start
```

✅ Runs on **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 **Connect Your Freighter Wallet**

1. Install the **Freighter Wallet** browser extension
2. Go to **Settings → Switch Network → Testnet**
3. Open the app → Click **“Connect Freighter Wallet”**
4. Your connected **Stellar public key** appears
5. Chat securely wallet-to-wallet 🎉

---

## 📡 **API Endpoints**

| Method   | Endpoint                         | Description                               |
| -------- | -------------------------------- | ----------------------------------------- |
| **GET**  | `/api/messages/:address/:friend` | Fetch all chat messages between two users |
| **POST** | `/api/send`                      | Send a message and save it to PostgreSQL  |

### Example Request:

```json
{
  "sender": "GDRXRA4SBGJS7MUL22DK3ZGL34FKEDE6KV2NEAPMEEN7XW2R5JEG4CJS",
  "recipient": "GBZJXU4WBMBQOGP6KFN7J43OAFIYXL2C2H2VSCAXUB54JQ5G2A5GBQJN",
  "text": "Hey there!"
}
```

---

## 🧠 **Future Improvements**

* ✉️ End-to-end **encryption** for off-chain messages
* 🧩 Permanent **decentralized storage** via IPFS
* 🔍 **Friend discovery** using Stellar memo hashes
* 📜 On-chain **message verification** via Soroban proofs

---

## 👨‍💻 **Author**

**Tejasvi Sinha**
🌐 Network: **Stellar Testnet**
📜 Contract ID: **CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE**
💬 Project: **Zenith Chat DApp**

---

