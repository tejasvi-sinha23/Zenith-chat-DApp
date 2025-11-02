# 💬 Zenith Chat — Stellar Freighter Wallet Messenger

Zenith Chat is a decentralized chat application built on **React + Express**, using the **Stellar Freighter Wallet** for secure authentication and identity.  
Users can connect their wallet, access chatrooms, and exchange messages — all tied to their **Stellar Testnet public key**.

---

## 🚀 Features

- 🔗 **Freighter Wallet Integration**
  - Connect securely using your Freighter wallet (Testnet)
  - Auto-verifies network and public key access

- 💬 **Chatrooms**
  - Message friends using their Stellar addresses
  - Messages are organized per friend (like WhatsApp)

- 🧠 **Local + Backend Storage**
  - Messages stored temporarily in the backend
  - Chat state handled client-side in React

- 🌐 **Fullstack App**
  - **Frontend:** React + Vite (or CRA)
  - **Backend:** Node.js + Express
  - **API communication:** Axios
  - **Blockchain Auth:** Stellar Freighter

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React, JavaScript, Axios |
| Backend | Node.js, Express |
| Wallet | Stellar Freighter API |
| Styling | Custom CSS / Tailwind (optional) |

---

## 📁 Project Structure
zenith-contract/
├── zenith_web/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── ConnectWallet.js
│ │ │ ├── FriendList.js
│ │ │ ├── MessageBoard.js
│ │ │ └── SendMessage.js
│ │ ├── App.js
│ │ └── styles.css
│ ├── package.json
│ └── build/ # Generated after build
└── backend/ # Express Backend
├── server.js
├── package.json
└── routes/


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/zenith-chat.git
cd contract

2️⃣ Install Frontend Dependencies
cd zenith_web
npm install

3️⃣ Install Backend Dependencies
cd ../backend
npm install

💻 Running Locally
🖥️ Run Backend
cd backend
node server.js


Backend runs on http://localhost:5000

🌐 Run Frontend
cd ../zenith_web
npm start


Frontend runs on http://localhost:3000

🔑 Connecting Freighter Wallet

Install the Freighter Wallet Extension

Open Freighter → Settings → Switch Network to TESTNET

Open the Zenith Chat app → Click “Connect Freighter Wallet”

You’ll see your connected public key

Start chatting 🎉

📡 API Endpoints
GET /api/messages/:address

Returns all messages for a wallet address.

POST /api/send

Sends a new message.

{
  "sender": "GDRXRA4SBGJS7MUL22DK3ZGL34FKEDE6KV2NEAPMEEN7XW2R5JEG4CJS",
  "recipient": "GBZJXU4WBMBQOGP6KFN7J43OAFIYXL2C2H2VSCAXUB54JQ5G2A5GBQJN",
  "text": "Hey there!"
}

🧱 Building for Production

To create an optimized build:

cd zenith_web
npm run build


Then serve it from Express:

cd ../backend
node server.js


Now the app will be available at:
👉 http://localhost:5000

