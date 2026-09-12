import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quizRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import skinAnalysisRoutes from "./routes/skinAnalysisRoutes.js";   // add this
dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// =========================
// CORS
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bellezaa-delta.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/routine", routineRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/skin-analysis", skinAnalysisRoutes);   // add this


app.get("/", (req, res) => {
  res.send("Bellezaa API Running");
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
};

startServer();