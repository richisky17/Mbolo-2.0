# ⚙️ Admin Settings Management

## Overview

The admin panel now includes a **Settings** tab where you can manage:
- 🔑 Stripe API Keys
- 🔐 Stripe Webhook Secrets  
- 💰 Subscription Pricing
- 💵 Currency Configuration
- 📅 Billing Intervals

All settings are stored in the database and take precedence over environment variables!

---

## 🎯 Key Features

### **1. Database-Stored Configuration**
- ✅ All settings stored in `app_settings` table
- ✅ Override environment variables
- ✅ Change settings without redeploying
- ✅ Instant updates to subscription pricing

### **2. Secure Key Management**
- 🔒 API keys and secrets are masked in list view
- 🔐 Only shows first 12 characters (e.g., `sk_test_1234...`)
- 👀 Admin-only access with authentication required

### **3. Dynamic Pricing**
- 💰 Change subscription price on the fly
- 💵 Support multiple currencies
- 📅 Switch between monthly/yearly billing
- 📊 MRR automatically recalculates

---

## 🚀 Quick Start

### **Step 1: Access Settings**
1. Go to `/admin`
2. Click **"Settings"** in the sidebar (⚙️ icon)

### **Step 2: Configure Stripe**
Click **"Create"** and add these settings:

#### **Setting 1: Stripe API Key**
- **Key:** `stripe_api_key`
- **Value:** `sk_test_...` or `sk_live_...`
- **Purpose:** Authenticates with Stripe API

#### **Setting 2: Stripe Webhook Secret**
- **Key:** `stripe_webhook_secret`
- **Value:** `whsec_...`
- **Purpose:** Verifies webhook signatures

### **Step 3: Configure Pricing** (Optional)
These have defaults but you can customize:

#### **Setting 3: Subscription Price**
- **Key:** `subscription_price`
- **Value:** `20` (in dollars, not cents)
- **Default:** `20`
- **Example:** For $29.99, enter `29.99`

#### **Setting 4: Currency**
- **Key:** `subscription_currency`
- **Value:** `USD`, `EUR`, `GBP`, etc.
- **Default:** `USD`

#### **Setting 5: Billing Interval**
- **Key:** `subscription_interval`
- **Value:** `month` or `year`
- **Default:** `month`

---

## 📊 Settings Priority

Settings are loaded in this order:

```
1. Database (app_settings table) ← Highest Priority
2. Environment Variables (.env.local)
3. Default Values ← Fallback
```

### Example:

```javascript
// If database has:
subscription_price = "25"

// And .env.local has:
SUBSCRIPTION_PRICE=20

// Result: $25 is used (database wins!)
```

---

## 💡 Use Cases

### **Change Pricing Without Redeployment**

**Before:**
- Change price in code
- Commit to git
- Deploy to production
- Wait 5-10 minutes

**After:**
1. Go to Settings
2. Edit `subscription_price`
3. Change `20` to `29.99`
4. Save
5. Done! ✅ (Instant)

### **Test Mode ↔ Live Mode**

**Test Mode:**
```
stripe_api_key = sk_test_51A...
stripe_webhook_secret = whsec_test...
```

**Live Mode:**
```
stripe_api_key = sk_live_51A...
stripe_webhook_secret = whsec_live...
```

Just edit the settings - no redeploy needed!

### **Regional Pricing**

**US Customers:**
```
subscription_price = 20
subscription_currency = USD
```

**EU Customers:**
```
subscription_price = 18
subscription_currency = EUR
```

---

## 🔒 Security Features

### **1. Admin-Only Access**
```typescript
// Every settings API call checks:
if (!userId || !isAdmin(userId)) {
  return "Unauthorized";
}
```

### **2. Masked Sensitive Values**
List view shows:
```
stripe_api_key: sk_test_1234...
stripe_webhook_secret: whsec_abcd...
```

Full values only visible when editing.

### **3. Audit Trail**
- `updated_at` timestamp on every change
- See when settings were last modified

---

## 📝 Database Schema

```sql
CREATE TABLE app_settings (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### **Default Settings:**
```sql
INSERT INTO app_settings (key, value) VALUES
  ('subscription_price', '20'),
  ('subscription_currency', 'USD'),
  ('subscription_interval', 'month');
```

---

## 🎨 Admin UI Features

### **Settings List**
- 📋 All settings in one view
- 🎨 Icons for each setting type
- 🔍 Masked sensitive values
- ⏰ Last updated timestamps
- ✏️ Quick edit buttons

### **Create Setting**
- 📝 Dropdown to select setting type
- 💡 Helper text for guidance
- 🔒 Multiline input for long values

### **Edit Setting**
- 🔐 Key field is disabled (can't change)
- ✏️ Full value visible for editing
- 🕐 Updates timestamp automatically

---

## 🔄 How It Works

### **Subscription Creation Flow**

1. User clicks "Upgrade to Pro"
2. System calls `createStripeUrl()`
3. Function fetches settings from database:
   ```typescript
   const price = await getSubscriptionPrice(); // From DB or default $20
   const currency = await getSubscriptionCurrency(); // From DB or "USD"
   const interval = await getSubscriptionInterval(); // From DB or "month"
   ```
4. Creates Stripe checkout with configured values
5. User pays with configured pricing

### **MRR Calculation**

Dashboard automatically uses configured price:
```typescript
const price = await getSubscriptionPrice(); // e.g., $29.99
const mrr = activeSubscriptions * price; // Real-time MRR
```

---

## ⚠️ Important Notes

### **Price Format**
- ✅ Enter in **dollars**: `20` or `29.99`
- ❌ NOT in cents: Don't enter `2000`
- 🔄 System converts to cents automatically

### **Environment Variables Still Work**
If no database setting exists, falls back to:
```bash
# .env.local
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### **Changing Existing Subscriptions**
- ⚠️ Only affects NEW subscriptions
- 🔒 Existing subscriptions keep their original price
- 🔄 Users must resubscribe for new pricing

---

## 🧪 Testing

### **Test the Settings**

1. **Set test price:**
   ```
   subscription_price = 1
   ```

2. **Try subscribing** in test mode

3. **Check Stripe Dashboard:**
   - Should show $1.00 subscription

4. **Verify MRR:**
   - Admin dashboard should show correct MRR

### **Test Fallback:**

1. Delete all settings from database
2. System should use defaults:
   - Price: $20
   - Currency: USD
   - Interval: month

---

## 📚 API Reference

### **Get Setting**
```typescript
import { getSetting } from "@/lib/settings";

const price = await getSetting("subscription_price");
// Returns: "20" or null
```

### **Get Multiple Settings**
```typescript
import { getSettings } from "@/lib/settings";

const settings = await getSettings([
  "subscription_price",
  "subscription_currency",
]);
// Returns: { subscription_price: "20", subscription_currency: "USD" }
```

### **Typed Getters**
```typescript
import {
  getSubscriptionPrice,
  getSubscriptionCurrency,
  getSubscriptionInterval,
} from "@/lib/settings";

const price = await getSubscriptionPrice(); // number
const currency = await getSubscriptionCurrency(); // string
const interval = await getSubscriptionInterval(); // "month" | "year"
```

---

## 🐛 Troubleshooting

### **Settings not appearing in list**
**Cause:** Table not created

**Fix:**
```bash
npx tsx src/server/scripts/create-settings-table.ts
```

### **Price change not taking effect**
**Cause:** Need to create new subscription

**Fix:**
- Existing subscriptions keep old price
- Cancel and resubscribe to get new price
- Or wait for next billing cycle

### **"Unauthorized" error**
**Cause:** Not logged in as admin

**Fix:**
- Verify you're logged in
- Check `isAdmin()` function includes your user ID

### **Stripe keys from database not working**
**Cause:** Invalid key format

**Fix:**
- Test keys start with: `sk_test_`
- Live keys start with: `sk_live_`
- Webhook secrets start with: `whsec_`

---

## 🎯 Best Practices

### **1. Use Environment Variables in Development**
```bash
# .env.local
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### **2. Use Database Settings in Production**
- ✅ Easier to change without redeployment
- ✅ Can switch between test/live mode instantly
- ✅ A/B test different pricing

### **3. Keep Environment Variables as Backup**
- 🔄 Database settings override environment
- 🛡️ Environment variables as fallback
- 🔐 Both methods are secure

### **4. Document Price Changes**
Keep a log of pricing changes:
```
2024-01-15: $20 → $25 (Added more features)
2024-02-01: $25 → $19.99 (Promotional pricing)
```

---

## 🚀 Future Enhancements

Possible additions:
- [ ] Multiple pricing tiers (Basic, Pro, Enterprise)
- [ ] Regional pricing rules
- [ ] Promotional pricing with expiry
- [ ] A/B testing different prices
- [ ] Price change history/audit log
- [ ] Bulk import/export settings
- [ ] Setting validation rules
- [ ] Setting templates for different environments

---

## 📖 Related Documentation

- [Admin Subscription Management](./ADMIN_SUBSCRIPTION_MANAGEMENT.md)
- [Stripe Vercel Setup](./STRIPE_VERCEL_SETUP.md)
- Stripe API: https://stripe.com/docs/api

---

**Happy configuring! ⚙️**

