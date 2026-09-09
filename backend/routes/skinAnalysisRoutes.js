import express from "express";
import multer from "multer";
import protect from "../middleware/authMiddleware.js";
import {
  analyzeSkin,
  getSkinAnalysisHistory,
} from "../controllers/skinAnalysisController.js";

// Keep the image in memory only (never written to disk) — it's converted
// to base64 and sent straight to the vision model, then discarded.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const router = express.Router();

router.post("/analyze", protect, upload.single("image"), analyzeSkin);
router.get("/history", protect, getSkinAnalysisHistory);

export default router;
