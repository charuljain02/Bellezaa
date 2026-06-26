import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  generateRoutine,
  getMyRoutines,
} from "../controllers/routineController.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateRoutine
);

router.get(
  "/my-routines",
  protect,
  getMyRoutines
);

export default router;