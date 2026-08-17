import pg from "pg";

import env from "./env.js";

const { Pool } = pg;

const db = new Pool({
  connectionString: env.databaseUrl,
});

db.on("connect", () => {
  console.log("PostgreSQL database connected");
});

db.on("error", (error) => {
  console.error("PostgreSQL pool error:", error);
});

export default db;
