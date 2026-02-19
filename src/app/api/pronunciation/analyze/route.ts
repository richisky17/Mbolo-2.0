import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { analyzePronunciation } from "@/lib/pronunciation";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const audioBlob = formData.get("audio") as File;
    const targetText = formData.get("targetText") as string;

    if (!audioBlob || !targetText) {
      return NextResponse.json(
        { error: "Missing audio or target text" },
        { status: 400 }
      );
    }

    // Convert File to Blob
    const blob = new Blob([await audioBlob.arrayBuffer()], {
      type: audioBlob.type,
    });

    // Analyze pronunciation
    const result = await analyzePronunciation(blob, targetText);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error analyzing pronunciation:", error);
    return NextResponse.json(
      { error: "Failed to analyze pronunciation" },
      { status: 500 }
    );
  }
}

