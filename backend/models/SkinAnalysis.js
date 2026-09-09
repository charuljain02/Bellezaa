import mongoose from "mongoose";

const skinAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    faceDetected: {
      type: Boolean,
      default: true,
    },

    overallSkinScore: Number,

    skinType: String,

    // Flexible nested structure (acne, blackheads, pores, pigmentation,
    // uneven tone, fine lines, texture, oiliness/dryness, sun damage).
    conditions: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // forehead / nose / cheeks / chin observations
    areaAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    recommendations: {
      type: [String],
      default: [],
    },

    disclaimer: String,
  },
  { timestamps: true }
);

const SkinAnalysis = mongoose.model("SkinAnalysis", skinAnalysisSchema);

export default SkinAnalysis;
