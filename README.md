💬 Zenith Chat — Stellar Freighter Wallet + Soroban Smart Contract Messenger

Zenith Chat is a decentralized chat DApp built on React + Express + Soroban, using the Stellar Freighter Wallet for authentication and identity.
Users connect their wallet, access chatrooms, and exchange messages — all linked to their Stellar Testnet public keys.
Message data can optionally be stored and verified on-chain via a Soroban smart contract.

🚀 Features

🔗 Freighter Wallet Integration

Connect securely using your Freighter wallet (Testnet)

Auto-verifies network and public key access

💬 Cross-Wallet Chatrooms

Chat using Stellar public keys (Testnet)

Each conversation is wallet-address based

⚡ Real-Time Messaging (Socket.io)

Instant updates between connected wallets

Message broadcast handled by backend WebSocket

🔐 Soroban Smart Contract Integration

Messages can be registered or validated on-chain

Uses deployed contract on Stellar Testnet for decentralized record

🌐 Fullstack DApp

Frontend: React (Vite)

Backend: Node.js (Express + Socket.io)

Blockchain Layer: Soroban + Stellar Testnet

Wallet: Stellar Freighter

🧩 Tech Stack
Layer	Technology
Frontend	React, Axios, Socket.io-client
Backend	Node.js, Express, Socket.io
Smart Contract	Soroban (Rust)
Wallet	Stellar Freighter
Blockchain	Stellar Testnet
Styling	Custom CSS / Tailwind

📄 Smart Contract Details
Contract Name: contract
Language: Rust (Soroban)
Network: Stellar Testnet
Contract ID: CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE

Key Functions:

Function	Description
store_message(sender, receiver, message)	Saves encrypted or plain message data on-chain
get_messages(address)	Retrieves messages for a specific wallet address

Example Invocation:

soroban invoke \
  --id CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE \
  --fn store_message \
  --arg sender:GDRXRA4SBGJS7MUL22DK3ZGL34FKEDE6KV2NEAPMEEN7XW2R5JEG4CJS \
  --arg receiver:GBZJXU4WBMBQOGP6KFN7J43OAFIYXL2C2H2VSCAXUB54JQ5G2A5GBQJN \
  --arg message:"Hey there from Zenith!"

📁 Project Structure
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
└── contract/             # Soroban Smart Contract (Rust)
    ├── Cargo.toml
    ├── src/lib.rs
    └── target/

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/tejasvi-sinha23/Zenith-chat-DApp.git
cd zenith-contract

2️⃣ Install Frontend Dependencies
cd zenith_web
npm install

3️⃣ Install Backend Dependencies
cd ../backend
npm install

💻 Running Locally
🖥️ Start Backend
cd backend
node server.js


Backend runs at 👉 http://localhost:4000

🌐 Start Frontend
cd ../zenith_web
npm start


Frontend runs at 👉 http://localhost:3000

🔑 Connect Freighter Wallet

Install the Freighter Wallet Extension

Open Freighter → Settings → Switch Network to TESTNET

Open the Zenith Chat app → Click "Connect Freighter Wallet"

You’ll see your connected public key appear

Start chatting securely with other Stellar users 🎉

📡 API Endpoints
Method	Endpoint	Description
GET	/api/messages/:address	Fetches all messages for a given address
POST	/api/send	Sends a message to a recipient

Example:

{
  "sender": "GDRXRA4SBGJS7MUL22DK3ZGL34FKEDE6KV2NEAPMEEN7XW2R5JEG4CJS",
  "recipient": "GBZJXU4WBMBQOGP6KFN7J43OAFIYXL2C2H2VSCAXUB54JQ5G2A5GBQJN",
  "text": "Hey there!"
}

🧱 Building for Production

To create an optimized frontend build:

cd zenith_web
npm run build


Then serve it with the backend:

cd ../backend
node server.js


Now your app will be available at 👉
http://localhost:4000

🧠 Future Improvements

Integrate message encryption before storing on-chain

Enable permanent decentralized message history using IPFS

Add friend discovery via Stellar memo hashes

👨‍💻 Author: Tejasvi Sinha

🌐 Network: Stellar Testnet
📜 Contract ID: CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE
💬 Project: Zenith Chat DApp