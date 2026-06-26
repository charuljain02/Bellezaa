import express from "express";

import dotenv from "dotenv";

import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quizRoutes.js";
import connectDB from "./config/db.js";
import routineRoutes from "./routes/routineRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/quiz",
  quizRoutes
);

app.use(
  "/api/routine",
  routineRoutes
);
app.use(
  "/api/products",
  productRoutes
);
app.use(
  "/api/chat",
  chatRoutes
);
app.get("/", (req, res) => {

res.send("Bellezaa API Running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

console.log(`Server running on port ${PORT}`);

});