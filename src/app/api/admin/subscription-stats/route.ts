import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import db from "@/server/db/drizzle";
import { userSubscription } from "@/server/db/schema";
import { getSubscriptionPrice } from "@/lib/settings";

export async function GET() {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const DAY_IN_MS = 86_400_000;
    const now = Date.now();

    // Get all subscriptions
    const allSubscriptions = await db.query.userSubscription.findMany();

    // Calculate statistics
    const totalSubscriptions = allSubscriptions.length;
    const activeSubscriptions = allSubscriptions.filter((sub) => {
      return (
        sub.stripePriceId &&
        sub.stripeCurrentPeriodEnd &&
        sub.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > now
      );
    }).length;

    const expiredSubscriptions = totalSubscriptions - activeSubscriptions;

    // Get configured price from database (with fallback to $20)
    const price = await getSubscriptionPrice();
    const mrr = activeSubscriptions * price;

    return NextResponse.json({
      totalSubscriptions,
      activeSubscriptions,
      expiredSubscriptions,
      mrr,
    });
  } catch (error) {
    console.error("Error fetching subscription stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

