import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  submitQuiz,
  getQuizHistory,
} from "../controllers/quizController.js";
const router = express.Router();

router.post(
  "/submit",
  protect,
  submitQuiz
);
router.get(
  "/history",
  protect,
  getQuizHistory
);

export default router;