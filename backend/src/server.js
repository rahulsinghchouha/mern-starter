import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = Number(process.env.PORT) || 5000;

try {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
} catch (error) {
  console.error("Failed to start the API server:", error);
  process.exitCode = 1;
}
