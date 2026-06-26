import mongoose from "mongoose";

const routineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skinType: String,
    concern: String,

    morningRoutine: [String],
    nightRoutine: [String],
  },
  { timestamps: true }
);

export default mongoose.model(
  "Routine",
  routineSchema
);