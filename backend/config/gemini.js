
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// export const askGemini = async (prompt) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: [
//       {
//         role: "user",
//         parts: [
//           {
//             text: `
// You are a professional skincare and beauty assistant.
// Give helpful, friendly advice about skincare routines,
// ingredients, and product recommendations.

// User query:
// ${prompt}
//             `,
//           },
//         ],
//       },
//     ],
//   });

//   return response.text;
// };

// // --------------------------------------------------
// // Extract JSON from model response
// // --------------------------------------------------
// const extractJson = (raw) => {
//   const trimmed = raw.trim();

//   try {
//     return JSON.parse(trimmed);
//   } catch {
//     const match = trimmed.match(/\{[\s\S]*\}/);

//     if (match) {
//       return JSON.parse(match[0]);
//     }

//     throw new Error("Could not parse skin analysis response as JSON");
//   }
// };

// // --------------------------------------------------
// // Skin analysis system prompt
// // --------------------------------------------------
// const SKIN_ANALYSIS_SYSTEM_PROMPT = `
// You are a professional AI skincare analyst reviewing a face photo
// for COSMETIC skincare purposes only.

// You are NOT providing a medical diagnosis.

// Carefully examine the uploaded face photo and respond with ONLY
// a single valid JSON object matching exactly this shape:

// {
//   "faceDetected": boolean,
//   "overallSkinScore": number,
//   "skinType": "oily" | "dry" | "combination" | "normal" | "sensitive",

//   "conditions": {
//     "acne": {
//       "present": boolean,
//       "severity": "none" | "mild" | "moderate" | "severe",
//       "type": string,
//       "affectedAreas": string[]
//     },

//     "blackheadsWhiteheads": {
//       "present": boolean,
//       "severity": "none" | "mild" | "moderate" | "severe",
//       "affectedAreas": string[]
//     },

//     "pores": {
//       "visibility": "low" | "medium" | "high",
//       "affectedAreas": string[]
//     },

//     "pigmentation": {
//       "present": boolean,
//       "severity": "none" | "mild" | "moderate" | "severe",
//       "affectedAreas": string[]
//     },

//     "unevenTone": {
//       "present": boolean,
//       "severity": "none" | "mild" | "moderate" | "severe"
//     },

//     "fineLinesWrinkles": {
//       "present": boolean,
//       "severity": "none" | "mild" | "moderate" | "severe",
//       "affectedAreas": string[]
//     },

//     "texture": {
//       "rating": "smooth" | "slightly uneven" | "rough",
//       "notes": string
//     },

//     "oilinessDryness": {
//       "type": "oily" | "dry" | "combination" | "normal",
//       "notes": string
//     },

//     "sunDamage": {
//       "present": boolean,
//       "severity": "none" | "mild" | "moderate" | "severe",
//       "notes": string
//     }
//   },

//   "areaAnalysis": {
//     "forehead": string,
//     "nose": string,
//     "cheeks": string,
//     "chin": string
//   },

//   "recommendations": string[],

//   "disclaimer": string
// }

// Rules:

// 1. If no face is clearly visible:
//    - Set "faceDetected": false
//    - Use neutral/empty values for the remaining fields
//    - Set severity values to "none"
//    - Set affectedAreas to []
//    - Explain the issue briefly in "disclaimer"

// 2. Base every field strictly on what is visibly observable.

// 3. Do not invent details that cannot be seen.

// 4. This is cosmetic skincare analysis only.

// 5. Do not diagnose medical diseases or conditions.

// 6. "overallSkinScore" must be between 0 and 100.

// 7. recommendations must contain 3-6 short,
//    actionable and friendly skincare tips.

// 8. Respond with ONLY the JSON object.

// 9. Do not use markdown fences.

// 10. Do not add any text before or after the JSON object.
// `;

// // --------------------------------------------------
// // Face / Skin Image Analysis
// // --------------------------------------------------
// export const analyzeSkinImage = async (
//   base64Image,
//   mimeType = "image/jpeg"
// ) => {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",

//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: SKIN_ANALYSIS_SYSTEM_PROMPT,
//             },
//             {
//               text: "Analyze this face photo for cosmetic skincare indicators and return the JSON exactly as instructed.",
//             },
//             {
//               inlineData: {
//                 mimeType: mimeType,
//                 data: base64Image,
//               },
//             },
//           ],
//         },
//       ],

//       config: {
//         temperature: 0.3,
//         maxOutputTokens: 4096,

//         responseMimeType: "application/json",
//       },
//     });

//     const raw = response.text;

//     if (!raw) {
//       throw new Error("Gemini returned an empty response");
//     }

//     return extractJson(raw);

//   } catch (error) {
//     console.error("Gemini skin analysis error:", error);
//     throw error;
//   }
// };

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }

  return new GoogleGenAI({ 
    apiKey: apiKey,
    vertexai: false // Forces the SDK to use Google AI Studio mode instead of Google Cloud ADC
  });
};

export const askGemini = async (prompt) => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are a professional skincare and beauty assistant.
Give helpful, friendly advice about skincare routines,
ingredients, and product recommendations.

User query:
${prompt}
            `,
          },
        ],
      },
    ],
  });

  return response.text;
};

// --------------------------------------------------
// Extract JSON from model response
// --------------------------------------------------
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

// --------------------------------------------------
// Skin analysis system prompt
// --------------------------------------------------
const SKIN_ANALYSIS_SYSTEM_PROMPT = `
You are a professional AI skincare analyst reviewing a face photo
for COSMETIC skincare purposes only.

You are NOT providing a medical diagnosis.

Carefully examine the uploaded face photo and respond with ONLY
a single valid JSON object matching exactly this shape:

{
  "faceDetected": boolean,
  "overallSkinScore": number,
  "skinType": "oily" | "dry" | "combination" | "normal" | "sensitive",

  "conditions": {
    "acne": {
      "present": boolean,
      "severity": "none" | "mild" | "moderate" | "severe",
      "type": string,
      "affectedAreas": string[]
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
    "forehead": string,
    "nose": string,
    "cheeks": string,
    "chin": string
  },

  "recommendations": string[],

  "disclaimer": string
}

Rules:

1. If no face is clearly visible:
   - Set "faceDetected": false
   - Use neutral/empty values for the remaining fields
   - Set severity values to "none"
   - Set affectedAreas to []
   - Explain the issue briefly in "disclaimer"

2. Base every field strictly on what is visibly observable.

3. Do not invent details that cannot be seen.

4. This is cosmetic skincare analysis only.

5. Do not diagnose medical diseases or conditions.

6. "overallSkinScore" must be between 0 and 100.

7. recommendations must contain 3-6 short,
   actionable and friendly skincare tips.

8. Respond with ONLY the JSON object.

9. Do not use markdown fences.

10. Do not add any text before or after the JSON object.
`;

// --------------------------------------------------
// Face / Skin Image Analysis
// --------------------------------------------------
export const analyzeSkinImage = async (
  base64Image,
  mimeType = "image/jpeg"
) => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",

      contents: [
        {
          role: "user",
          parts: [
            {
              text: SKIN_ANALYSIS_SYSTEM_PROMPT,
            },
            {
              text: "Analyze this face photo for cosmetic skincare indicators and return the JSON exactly as instructed.",
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image,
              },
            },
          ],
        },
      ],

      config: {
        temperature: 0.3,
        maxOutputTokens: 4096,

        responseMimeType: "application/json",
      },
    });

    const raw = response.text;

    if (!raw) {
      throw new Error("Gemini returned an empty response");
    }

    return extractJson(raw);

  } catch (error) {
    console.error("Gemini skin analysis error:", error);
    throw error;
  }
};