import ChatHistory from "../models/ChatHistory.js";
import { askGemini }
from "../config/gemini.js";

export const chatWithAssistant =
async (req, res) => {

  try {

    const { message } = req.body;

    const reply =
      await askGemini(message);

    const chat =
      await ChatHistory.create({
        user: req.user._id,
        question: message,
        answer: reply,
      });

    res.json(chat);

  } catch (error) {
  console.log("CHAT ERROR:");
  console.log(error);

  res.status(500).json({
    message: error.message,
  });


  }
};

export const getHistory =
async (req, res) => {

  const history =
    await ChatHistory.find({
      user: req.user._id,
    });

  res.json(history);
};