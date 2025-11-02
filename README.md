💬 Zenith Chat — Stellar Freighter Wallet + Soroban Smart Contract Messenger

Zenith Chat is a decentralized chat DApp built with React + Express + Soroban, using the Stellar Freighter Wallet for secure authentication and identity.
Users can connect their wallet, access chatrooms, and exchange messages — all tied to their Stellar Testnet public keys.
Messages can optionally be stored or verified on-chain using a Soroban smart contract.

🚀 Features
🔗 Freighter Wallet Integration

Secure login with Freighter Wallet (Testnet)

Automatic Stellar network verification

Uses the connected public key as identity

💬 Cross-Wallet Chatrooms

Send and receive messages using Stellar public keys

Each chatroom is tied to wallet address pairs

⚡ Real-Time Messaging (Socket.io)

Live updates for both sender and receiver

WebSocket-powered backend for instant delivery

🔐 Soroban Smart Contract Integration

Record or verify messages on-chain

Contract deployed on Stellar Testnet

Verifiable message ownership and timestamp

🌐 Fullstack DApp Architecture
Layer	Technology
Frontend	React (Vite) + Axios + Socket.io-client
Backend	Node.js + Express + Socket.io
Smart Contract	Soroban (Rust)
Wallet	Stellar Freighter
Blockchain	Stellar Testnet
Styling	Custom CSS / Tailwind


📄 Smart Contract Details
Property	Value
Contract Name	contract
Language	Rust (Soroban)
Network	Stellar Testnet
Contract ID	CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE
![alt text](<contract/contract explorer.jpeg>)


🧠 Key Functions
Function	Description
store_message(sender, receiver, message)	Saves encrypted or plain text message data on-chain
get_messages(address)	Retrieves messages for a specific wallet address
🔧 Example Invocation
soroban invoke \
  --id CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE \
  --fn store_message \
  --arg sender:GDRXRA4SBGJS7MUL22DK3ZGL34FKEDE6KV2NEAPMEEN7XW2R5JEG4CJS \
  --arg receiver:GBZJXU4WBMBQOGP6KFN7J43OAFIYXL2C2H2VSCAXUB54JQ5G2A5GBQJN \
  --arg message:"Hey there from Zenith!"

📁 Project Structure

```zenith-dapp/
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

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/tejasvi-sinha23/Zenith-chat-DApp.git
cd Zenith-chat-DApp

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

🔑 Connect Your Freighter Wallet

Install the Freighter Wallet browser extension

Open Freighter → Go to Settings → Switch Network → Testnet

Open the Zenith Chat app → Click "Connect Freighter Wallet"

Your connected public key will appear

Start chatting securely with other Stellar users 🎉

📡 API Endpoints
Method	Endpoint	Description
GET	/api/messages/:address	Fetch all messages for a given address
POST	/api/send	Send a message to a recipient
Example Request
{
  "sender": "GDRXRA4SBGJS7MUL22DK3ZGL34FKEDE6KV2NEAPMEEN7XW2R5JEG4CJS",
  "recipient": "GBZJXU4WBMBQOGP6KFN7J43OAFIYXL2C2H2VSCAXUB54JQ5G2A5GBQJN",
  "text": "Hey there!"
}

🧱 Building for Production
Build Frontend
cd zenith_web
npm run build

Serve with Backend
cd ../backend
node server.js


Your full DApp will now be served at 👉 http://localhost:4000

🧠 Future Improvements

✉️ End-to-end message encryption before on-chain registration

🧩 Permanent decentralized storage via IPFS

🔍 Friend discovery using Stellar memo hashes

📜 On-chain message proof verification through Soroban

👨‍💻 Author

Tejasvi Sinha
🌐 Network: Stellar Testnet
📜 Contract ID: CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE
💬 Project: Zenith Chat DApp