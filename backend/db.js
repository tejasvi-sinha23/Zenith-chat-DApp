// backend/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "zenith_chat",
  password: "Psql@18tejasvi!",
  port: 5432,
});

// ✅ Test the DB connection
pool
  .connect()
  .then(() => console.log("🟢 Connected to PostgreSQL"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

module.exports = pool;
