import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import db from "@/server/db/drizzle";
import { userSubscription } from "@/server/db/schema";

export async function GET(
  req: Request,
  { params }: { params: { userSubscriptionId: string } }
) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.id, parseInt(params.userSubscriptionId)),
  });

  if (!data) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Fetch user information from Clerk
  try {
    const user = await clerkClient().users.getUser(data.userId);
    const enrichedData = {
      ...data,
      username: user.username || user.firstName || user.emailAddresses[0]?.emailAddress || "Unknown",
      email: user.emailAddresses[0]?.emailAddress || "",
    };
    return NextResponse.json(enrichedData);
  } catch (error) {
    // If user not found in Clerk, return with default values
    return NextResponse.json({
      ...data,
      username: "Unknown User",
      email: "",
    });
  }
}

