import mongoose from "mongoose";
import ReactMarkdown from "react-markdown";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    question: String,

    answer: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ChatHistory",
  chatSchema
);