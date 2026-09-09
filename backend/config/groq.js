import Groq from "groq-sdk";

export const askGroq = async (prompt) => {
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

// Pulls the first valid JSON object out of a model response, in case the
// model wraps it in markdown fences or adds stray text around it.
const extractJson = (raw) => {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error("Could not parse skin analysis response as JSON");
  }
};

const SKIN_ANALYSIS_SYSTEM_PROMPT = `You are a professional AI skincare analyst reviewing a face photo for COSMETIC skincare purposes only. You are not providing a medical diagnosis.

Carefully examine the uploaded face photo and respond with ONLY a single valid JSON object (no markdown fences, no commentary, no text before or after it) matching exactly this shape:

{
  "faceDetected": boolean,
  "overallSkinScore": number (0-100, higher is healthier-looking skin),
  "skinType": "oily" | "dry" | "combination" | "normal" | "sensitive",
  "conditions": {
    "acne": {
      "present": boolean,
      "severity": "none" | "mild" | "moderate" | "severe",
      "type": string (e.g. "comedonal", "inflammatory/papulopustular", "cystic", "hormonal", "none"),
      "affectedAreas": string[] (subset of ["forehead","nose","cheeks","chin","jawline"])
    },
    "blackheadsWhiteheads": {
      "present": boolean,
      "severity": "none" | "mild" | "moderate" | "severe",
      "affectedAreas": string[]
    },
    "pores": {
      "visibility": "low" | "medium" | "high",
      "affectedAreas": string[]
    },
    "pigmentation": {
      "present": boolean,
      "severity": "none" | "mild" | "moderate" | "severe",
      "affectedAreas": string[]
    },
    "unevenTone": {
      "present": boolean,
      "severity": "none" | "mild" | "moderate" | "severe"
    },
    "fineLinesWrinkles": {
      "present": boolean,
      "severity": "none" | "mild" | "moderate" | "severe",
      "affectedAreas": string[]
    },
    "texture": {
      "rating": "smooth" | "slightly uneven" | "rough",
      "notes": string
    },
    "oilinessDryness": {
      "type": "oily" | "dry" | "combination" | "normal",
      "notes": string
    },
    "sunDamage": {
      "present": boolean,
      "severity": "none" | "mild" | "moderate" | "severe",
      "notes": string
    }
  },
  "areaAnalysis": {
    "forehead": string (short observation),
    "nose": string (short observation),
    "cheeks": string (short observation),
    "chin": string (short observation)
  },
  "recommendations": string[] (3-6 short, actionable, friendly skincare tips based on the findings),
  "disclaimer": string (one short sentence noting this is an AI cosmetic estimate, not a medical diagnosis)
}

Rules:
- If no face is clearly visible in the photo, set "faceDetected": false, fill other fields with neutral/empty defaults (e.g. "none" severities, empty arrays), and explain briefly in "disclaimer".
- Base every field strictly on what is visibly observable in the image. Do not invent detail you cannot see.
- Respond with ONLY the JSON object, nothing else.`;

export const analyzeSkinImage = async (base64Image, mimeType = "image/jpeg") => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-maverick-17b-128e-instruct",    messages: [
      {
        role: "system",
        content: SKIN_ANALYSIS_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this face photo for skin-condition indicators and return the JSON exactly as instructed.",
          },
          {
            type: "image_url",
            image_url: { url: `data:${mimeType};base64,${base64Image}` },
          },
        ],
      },
    ],
    temperature: 0.3,
    max_tokens: 4096,
  });

  const raw = completion.choices[0].message.content;
  return extractJson(raw);
};