import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import itemsRoutes from "./routes/items.js";

const app = express();
app.set("trust proxy", 1);
// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Developer tracking API running" });
});

app.use("/auth", authRoutes);
app.use("/items", itemsRoutes);

export default app;
