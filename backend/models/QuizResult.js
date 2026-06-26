import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sleepHours: Number,
    waterIntake: Number,
    sunscreenUsage: Boolean,
    stressLevel: Number,
    workoutFrequency: Number,
    routineConsistency: Number,

    glowScore: Number,
  },
  { timestamps: true }
);

const QuizResult = mongoose.model(
  "QuizResult",
  quizResultSchema
);

export default QuizResult;