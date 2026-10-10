import cors from "cors";
import express from "express";
import itemRoutes from "./routes/itemRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/items", itemRoutes);
app.use(errorHandler);

export default app;
