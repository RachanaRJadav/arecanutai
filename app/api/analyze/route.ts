import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    // Remove data:image/...;base64, prefix
    const base64Image = image.split(",")[1];

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json", // helpful but not guaranteed
      },
    });

    const result = await model.generateContent([
      {
        text: `Analyze this arecanut image and return ONLY valid JSON
in the exact structure below. Do not add explanations, markdown, or extra text.

{
  "quality_score": 0.0,
  "grade": "A/B/C/D",
  "color_assessment": "",
  "size_assessment": "",
  "defects_found": [],
  "maturity_level": "",
  "recommendations": [],
  "overall_assessment": ""
}`
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
    ]);

    // Raw response from Gemini
    const rawText = result.response.text();

    // ✅ Clean markdown code fences if present
    const cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let analysis;
    try {
      analysis = JSON.parse(cleanedText);
    } catch (error) {
      console.error("JSON Parse Failed:", cleanedText);
      return NextResponse.json(
        {
          error: "Failed to parse Gemini JSON",
          raw: rawText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
