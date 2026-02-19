import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import db from "@/server/db/drizzle";
import { stripe } from "@/lib/stripe";
import { userSubscription } from "@/server/db/schema";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message);
    return new NextResponse(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  console.log("Stripe webhook event received:", event.type);

  // after successful completion of the subscription creation process
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log("Processing checkout.session.completed for session:", session.id);
    
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      console.error("No userId in session metadata");
      return new NextResponse("User ID is required", { status: 400 });
    }

    try {
      await db.insert(userSubscription).values({
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,

        // first item [0] in the array because only 1 item is defined in `line_items`
        stripePriceId: subscription.items.data[0].price.id,

        // convert Unix timestamp to JavaScript `Date` in ms
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      });
      
      console.log("Successfully created subscription for user:", session.metadata.userId);
    } catch (error: any) {
      console.error("Failed to create subscription:", error.message);
      return new NextResponse("Database error", { status: 500 });
    }
  }

  // after successful completion of the subscription renewal process
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;
    
    console.log("Processing invoice.payment_succeeded for invoice:", invoice.id);
    
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string
    );

    try {
      await db
        .update(userSubscription)
        .set({
          // first item [0] in the array because only 1 item is defined in `line_items`
          stripePriceId: subscription.items.data[0].price.id,

          // convert Unix timestamp to JavaScript `Date` in ms
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        })
        .where(eq(userSubscription.stripeSubscriptionId, subscription.id));
      
      console.log("Successfully renewed subscription:", subscription.id);
    } catch (error: any) {
      console.error("Failed to update subscription:", error.message);
      return new NextResponse("Database error", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
