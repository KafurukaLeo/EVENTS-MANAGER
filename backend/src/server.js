import app from "./app.js";
import env from "./config/env.js";
import db from "./config/database.js";

const startServer = async () => {
  try {
    await db.query("SELECT NOW()");

    console.log("Database connection successful");

    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
      console.log(`Swagger UI available at http://localhost:${env.port}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);

    process.exit(1);
  }
};

startServer();
