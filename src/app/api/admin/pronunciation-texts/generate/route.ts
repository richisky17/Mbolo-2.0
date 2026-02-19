import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/server/db/drizzle";
import { pronunciationTexts } from "@/server/db/schema";
import { isAdmin } from "@/lib/admin";

export const dynamic = 'force-dynamic';

/**
 * Generate pronunciation practice texts using AI
 * Uses OpenAI API if available, otherwise generates mock texts
 */
export async function POST(req: NextRequest) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { courseId, difficulty = "beginner", category = "", count = 5 } = body;

    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY;

    let generatedTexts: string[] = [];

    if (openaiApiKey) {
      // Use OpenAI API for real generation
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are a language learning assistant. Generate ${count} short, practical pronunciation practice sentences for ${difficulty} level students. ${category ? `Focus on the category: ${category}` : ""}. Each sentence should be 5-15 words long and suitable for pronunciation practice.`,
              },
              {
                role: "user",
                content: `Generate ${count} pronunciation practice sentences. Return only the sentences, one per line, no numbering or bullets.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 200,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0]?.message?.content || "";
          generatedTexts = content
            .split("\n")
            .map((line: string) => line.trim())
            .filter((line: string) => line.length > 0 && !line.match(/^\d+[\.\)]/))
            .slice(0, count);
        }
      } catch (openaiError) {
        console.error("OpenAI API error:", openaiError);
        // Fallback to mock generation
      }
    }

    // Fallback: Generate mock texts if OpenAI fails or not configured
    if (generatedTexts.length === 0) {
      const mockTexts = {
        beginner: [
          "Hello, how are you today?",
          "I am learning a new language.",
          "Can you help me practice pronunciation?",
          "Thank you for your help.",
          "I speak Spanish fluently.",
        ],
        intermediate: [
          "The weather is beautiful today.",
          "I love learning new words.",
          "Practice makes perfect.",
          "Pronunciation is important.",
          "Let's practice together.",
        ],
        advanced: [
          "The comprehensive linguistic analysis reveals significant patterns.",
          "Sophisticated pronunciation techniques enhance communication effectiveness.",
          "Advanced learners demonstrate remarkable fluency and accuracy.",
          "Complex sentence structures require meticulous attention to detail.",
          "Mastering pronunciation involves understanding subtle phonetic nuances.",
        ],
      };

      const categoryTexts: Record<string, string[]> = {
        greetings: [
          "Good morning, how are you?",
          "Nice to meet you!",
          "Have a great day!",
          "See you later!",
          "How's everything going?",
        ],
        numbers: [
          "I have three apples.",
          "Ten students are in the class.",
          "One hundred dollars is a lot.",
          "Five plus five equals ten.",
          "Count from one to twenty.",
        ],
        food: [
          "I love Italian pasta.",
          "Can I have a coffee?",
          "The pizza is delicious.",
          "I'm hungry for lunch.",
          "Let's order some food.",
        ],
        travel: [
          "I'm traveling to Paris.",
          "The airport is very busy.",
          "I need a hotel room.",
          "How do I get to the station?",
          "I love exploring new places.",
        ],
      };

      const baseTexts = categoryTexts[category.toLowerCase()] || mockTexts[difficulty as keyof typeof mockTexts] || mockTexts.beginner;
      generatedTexts = Array.from({ length: count }, (_, i) => {
        const text = baseTexts[i % baseTexts.length];
        return text;
      });
    }

    // Save generated texts to database
    const savedTexts = [];
    const prompt = `Generate ${count} ${difficulty} level pronunciation practice sentences${category ? ` about ${category}` : ""}`;

    for (let i = 0; i < generatedTexts.length; i++) {
      const [saved] = await db
        .insert(pronunciationTexts)
        .values({
          courseId: courseId || null,
          text: generatedTexts[i],
          difficulty,
          category: category || null,
          order: i,
          aiGenerated: true,
          generatedPrompt: prompt,
        })
        .returning();

      savedTexts.push(saved);
    }

    return NextResponse.json({
      success: true,
      count: savedTexts.length,
      texts: savedTexts,
    });
  } catch (error) {
    console.error("Error generating pronunciation texts:", error);
    return NextResponse.json(
      { error: "Failed to generate pronunciation texts" },
      { status: 500 }
    );
  }
}

