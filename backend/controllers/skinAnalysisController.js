import SkinAnalysis from "../models/SkinAnalysis.js";
import { analyzeSkinImage } from "../config/gemini.js";

// Allowed MIME types for image analysis
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const analyzeSkin = async (req, res) => {
  try {
    // 1. File existence validation
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        message: "Please upload or capture a face photo to analyze.",
      });
    }

    // 2. MIME type validation
    if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
      return res.status(400).json({
        message: "Invalid file format. Please provide a JPEG, PNG, or WebP image.",
      });
    }

    const base64Image = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    // 3. Call AI Service
    let analysis;
    try {
      analysis = await analyzeSkinImage(base64Image, mimeType);
    } catch (aiError) {
      console.error("Gemini Service Error:", aiError.message);
      return res.status(502).json({
        message: "Failed to process image with AI service. Please try again.",
      });
    }

    // 4. Handle Case Where No Face Was Detected
    if (!analysis || !analysis.faceDetected) {
      return res.status(422).json({
        faceDetected: false,
        message:
          analysis?.disclaimer ||
          "We couldn't clearly detect a face in that photo. Please try again with a clear, well-lit, front-facing photo.",
      });
    }

    // 5. Persist to Database safely
    const saved = await SkinAnalysis.create({
      userId: req.user._id,
      faceDetected: true,
      overallSkinScore: analysis.overallSkinScore ?? 0,
      skinType: analysis.skinType || "Unknown",
      conditions: analysis.conditions || {},
      areaAnalysis: analysis.areaAnalysis || {},
      recommendations: analysis.recommendations || [],
      disclaimer: analysis.disclaimer || "",
    });

    return res.status(201).json(saved);
  } catch (error) {
    console.error("SKIN ANALYSIS CONTROLLER ERROR:", error);

    // Mongoose Validation Error catch
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Data validation failed while saving analysis.",
        details: error.message,
      });
    }

    return res.status(500).json({
      message: "We couldn't analyze that photo right now. Please try again in a moment.",
    });
  }
};

export const getSkinAnalysisHistory = async (req, res) => {
  try {
    // Simple verification for user context
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized request." });
    }

    const history = await SkinAnalysis.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .lean(); // .lean() improves query read performance when documents are read-only

    return res.status(200).json(history);
  } catch (error) {
    console.error("GET HISTORY ERROR:", error);
    return res.status(500).json({
      message: "Failed to retrieve analysis history.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};