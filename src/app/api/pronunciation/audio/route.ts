import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic';

/**
 * Generate pronunciation audio using OpenAI TTS API
 * Supports multiple natural voices: alloy, echo, fable, onyx, nova, shimmer
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { text, voice = "nova" } = body; // Default to "nova" voice (natural female)

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    // Validate voice option
    const validVoices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];
    const selectedVoice = validVoices.includes(voice.toLowerCase()) 
      ? voice.toLowerCase() 
      : "nova";

    try {
      // Call OpenAI TTS API
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1", // Use tts-1 for faster generation, or tts-1-hd for higher quality
          input: text,
          voice: selectedVoice,
          speed: 1.0, // Normal speed
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("OpenAI TTS API error:", errorData);
        return NextResponse.json(
          { error: "Failed to generate audio. Please check your OpenAI API configuration." },
          { status: response.status }
        );
      }

      // Get audio buffer
      const audioBuffer = await response.arrayBuffer();
      
      // Convert to base64 for easy transmission
      const base64Audio = Buffer.from(audioBuffer).toString('base64');
      
      // Return base64 audio data
      return NextResponse.json({
        success: true,
        audio: base64Audio,
        format: "mp3",
        voice: selectedVoice,
      });
    } catch (openaiError: any) {
      console.error("OpenAI API error:", openaiError);
      return NextResponse.json(
        { error: openaiError.message || "Failed to generate audio" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error generating pronunciation audio:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

