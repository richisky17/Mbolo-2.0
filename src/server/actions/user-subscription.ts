"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/server/db/queries";
import {
  getSubscriptionPrice,
  getSubscriptionCurrency,
  getSubscriptionInterval,
} from "@/lib/settings";

const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const userSubscription = await getUserSubscription();

  // session for current subscribers
  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: returnUrl,
    });

    return { data: stripeSession.url };
  }

  // Get subscription configuration from database settings
  const price = await getSubscriptionPrice();
  const currency = await getSubscriptionCurrency();
  const interval = await getSubscriptionInterval();

  // session for new subscribers
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: currency,
          product_data: {
            name: "Mbolo Pro",
            description: "Unlimited Hearts",
          },
          unit_amount: Math.round(price * 100), // Convert dollars to cents
          recurring: {
            interval: interval,
          },
        },
      },
    ],
    metadata: {
      userId,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

  return { data: stripeSession.url };
};
