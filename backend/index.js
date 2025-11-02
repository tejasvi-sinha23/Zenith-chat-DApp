const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/getPublicKey/:account", (req, res) => {
  const account = req.params.account;

  exec(`stellar keys address ${account}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing stellar command:", stderr);
      return res.status(500).json({ error: stderr.trim() });
    }

    const pubKey = stdout.trim();
    res.json({ publicKey: pubKey });
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
