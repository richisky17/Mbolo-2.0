import { eq } from "drizzle-orm";
import db from "@/server/db/drizzle";
import { appSettings } from "@/server/db/schema";

export async function getSetting(key: string): Promise<string | null> {
  try {
    const setting = await db.query.appSettings.findFirst({
      where: eq(appSettings.key, key),
    });
    return setting?.value || null;
  } catch (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return null;
  }
}

export async function getSettings(keys: string[]): Promise<Record<string, string | null>> {
  try {
    const settings = await db.query.appSettings.findMany();
    const result: Record<string, string | null> = {};
    
    keys.forEach((key) => {
      const setting = settings.find((s) => s.key === key);
      result[key] = setting?.value || null;
    });
    
    return result;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return keys.reduce((acc, key) => ({ ...acc, [key]: null }), {});
  }
}

// Default values with fallback to environment variables
export async function getStripeApiKey(): Promise<string> {
  const dbKey = await getSetting("stripe_api_key");
  return dbKey || process.env.STRIPE_API_KEY || "";
}

export async function getStripeWebhookSecret(): Promise<string> {
  const dbSecret = await getSetting("stripe_webhook_secret");
  return dbSecret || process.env.STRIPE_WEBHOOK_SECRET || "";
}

export async function getSubscriptionPrice(): Promise<number> {
  const dbPrice = await getSetting("subscription_price");
  if (dbPrice) {
    const price = parseFloat(dbPrice);
    return isNaN(price) ? 20 : price;
  }
  return 20; // Default $20
}

export async function getSubscriptionCurrency(): Promise<string> {
  const dbCurrency = await getSetting("subscription_currency");
  return dbCurrency || "USD";
}

export async function getSubscriptionInterval(): Promise<"month" | "year"> {
  const dbInterval = await getSetting("subscription_interval");
  return (dbInterval as "month" | "year") || "month";
}

