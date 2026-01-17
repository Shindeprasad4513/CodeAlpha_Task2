
import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const FALLBACK_QUOTES: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Success" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Motivation" },
  { text: "Everything has beauty, but not everyone sees it.", author: "Confucius", category: "Wisdom" },
  { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln", category: "Success" },
];

export const fetchRandomQuote = async (): Promise<Quote> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate one profound, inspiring, or famous quote. It can be from history, literature, or modern thinkers. Make it impactful.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: {
              type: Type.STRING,
              description: "The text of the quote.",
            },
            author: {
              type: Type.STRING,
              description: "The name of the author.",
            },
            category: {
              type: Type.STRING,
              description: "A short category name (e.g., Wisdom, Leadership, Love).",
            },
          },
          required: ["quote", "author", "category"],
        },
      },
    });

    const jsonStr = response.text?.trim();
    if (jsonStr) {
      const parsed = JSON.parse(jsonStr);
      return {
        text: parsed.quote,
        author: parsed.author,
        category: parsed.category,
      };
    }
    throw new Error("Invalid API response");
  } catch (error) {
    console.error("Error fetching quote from Gemini:", error);
    // Return a random fallback quote if the API fails
    return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  }
};
