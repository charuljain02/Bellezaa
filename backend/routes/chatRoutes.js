import express from "express";

import {
  chatWithAssistant,
  getHistory,
} from "../controllers/chatController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  chatWithAssistant
);

router.get(
  "/history",
  protect,
  getHistory
);


export default router;