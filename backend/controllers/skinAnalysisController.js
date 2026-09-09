import SkinAnalysis from "../models/SkinAnalysis.js";
import { analyzeSkinImage } from "../config/groq.js";

export const analyzeSkin = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload or capture a face photo to analyze.",
      });
    }

    const base64Image = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    const analysis = await analyzeSkinImage(base64Image, mimeType);

    if (!analysis.faceDetected) {
      return res.status(422).json({
        faceDetected: false,
        message:
          analysis.disclaimer ||
          "We couldn't clearly detect a face in that photo. Please try again with a clear, well-lit, front-facing photo.",
      });
    }

    const saved = await SkinAnalysis.create({
      userId: req.user._id,
      faceDetected: true,
      overallSkinScore: analysis.overallSkinScore,
      skinType: analysis.skinType,
      conditions: analysis.conditions,
      areaAnalysis: analysis.areaAnalysis,
      recommendations: analysis.recommendations,
      disclaimer: analysis.disclaimer,
    });

    res.status(201).json(saved);
  } catch (error) {
    console.log("SKIN ANALYSIS ERROR:");
    console.log(error);

    res.status(500).json({
      message:
        "We couldn't analyze that photo right now. Please try again in a moment.",
    });
  }
};

export const getSkinAnalysisHistory = async (req, res) => {
  try {
    const history = await SkinAnalysis.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
