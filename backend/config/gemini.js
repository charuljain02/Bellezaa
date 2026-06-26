import Groq from "groq-sdk";

export const askGemini = async (prompt) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional skincare and beauty assistant. Give helpful, friendly advice about skincare routines, ingredients, and product recommendations.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    max_tokens: 1024,
  });

  return completion.choices[0].message.content;
};