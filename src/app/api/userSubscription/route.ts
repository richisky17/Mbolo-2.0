import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { clerkClient } from "@clerk/nextjs/server";

import db from "@/server/db/drizzle";
import { userSubscription } from "@/server/db/schema";

export async function GET(req: Request) {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("_page") || "1");
  const perPage = parseInt(searchParams.get("_perPage") || "10");
  const offset = (page - 1) * perPage;

  try {
    const data = await db.query.userSubscription.findMany({
      limit: perPage,
      offset: offset,
      orderBy: (userSubscription, { desc }) => [desc(userSubscription.id)],
    });

    // Fetch user information from Clerk
    const enrichedData = await Promise.all(
      data.map(async (subscription) => {
        try {
          const user = await clerkClient().users.getUser(subscription.userId);
          return {
            ...subscription,
            username: user.username || user.firstName || user.emailAddresses[0]?.emailAddress || "Unknown",
            email: user.emailAddresses[0]?.emailAddress || "",
          };
        } catch (error) {
          // If user not found in Clerk, return with default values
          return {
            ...subscription,
            username: "Unknown User",
            email: "",
          };
        }
      })
    );

    const total = await db.query.userSubscription.findMany();

    return NextResponse.json(enrichedData, {
      headers: {
        "Content-Range": `userSubscription ${offset}-${offset + enrichedData.length}/${total.length}`,
        "Access-Control-Expose-Headers": "Content-Range",
      },
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

