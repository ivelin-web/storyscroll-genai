import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("API Key is missing! Make sure GEMINI_API_KEY is set in .env.local");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a compelling, cinematic narrative structure for a scrolling landing page about: "${topic}". 
      The tone should be sophisticated, inspiring, and modern.
      Return 5 distinct sections that tell a story from beginning to end.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A short, punchy, 2-4 word title." },
            subtitle: { type: Type.STRING, description: "A provocative or inspiring one-sentence subtitle." },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  headline: { type: Type.STRING, description: "Section header, 3-6 words." },
                  content: { type: Type.STRING, description: "Paragraph text, around 40-60 words, evocative language." },
                  imageKeyword: { type: Type.STRING, description: "A single concrete noun (e.g., 'mountain', 'circuit', 'nebula') to use as a visual seed." },
                  colorAccent: { type: Type.STRING, description: "A hex color code (e.g. #FF5733) matching the mood of this section." }
                },
                required: ["headline", "content", "imageKeyword", "colorAccent"]
              }
            }
          },
          required: ["title", "subtitle", "sections"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No content generated");
    }

    const rawData = JSON.parse(response.text);

    // Hydrate with IDs and the original topic
    const storyData = {
      topic,
      title: rawData.title,
      subtitle: rawData.subtitle,
      sections: rawData.sections.map((s: any, i: number) => ({
        ...s,
        id: `section-${i}`
      }))
    };

    return NextResponse.json(storyData);

  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: "Failed to generate story" }, { status: 500 });
  }
}
