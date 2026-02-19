import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const apiKey = process.env.STRIPE_API_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let mode: "test" | "live" | "unknown" = "unknown";
  if (apiKey) {
    if (apiKey.startsWith("sk_test_")) {
      mode = "test";
    } else if (apiKey.startsWith("sk_live_")) {
      mode = "live";
    }
  }

  return NextResponse.json({
    apiKeyConfigured: !!apiKey,
    webhookSecretConfigured: !!webhookSecret,
    mode,
  });
}

