# 📊 Admin Panel - Subscription Management

## Overview

The admin panel now includes comprehensive subscription management features that allow you to:
- ✅ View all user subscriptions
- ✅ Monitor Stripe configuration status
- ✅ Track subscription statistics (Active, Expired, MRR)
- ✅ View detailed subscription information

---

## 🎯 Features Added

### 1. **Stripe Configuration Panel**

Located at the top of the dashboard, this panel shows:
- ✓ API Key status (Test/Live mode detection)
- ✓ Webhook Secret status
- ⚠️ Configuration warnings if any keys are missing
- 📋 Instructions for missing environment variables

**Colors:**
- 🟢 Green = All configured
- 🟡 Yellow = Missing configuration
- 🔴 Red = Error loading configuration

### 2. **Subscription Statistics Cards**

Real-time dashboard cards showing:
- 👥 **Total Subscriptions** - All subscriptions in the system
- 📈 **Active** - Currently active subscriptions (green)
- ❌ **Expired** - Expired subscriptions (red)
- 💰 **MRR** - Monthly Recurring Revenue (calculated at $20/subscription)

**Features:**
- Hover animations for better UX
- Color-coded icons
- Auto-refresh on page load

### 3. **Subscriptions Resource**

A new menu item "Subscriptions" in the admin sidebar that shows:

**List View:**
- User IDs
- Stripe Customer IDs
- Subscription status (Active/Expired)
- Period end dates
- Price IDs

**Show View:**
- Full subscription details
- Days remaining calculation
- Visual status indicators

---

## 🔧 Environment Variables

The system reads configuration from environment variables (`.env.local` or Vercel environment):

```bash
# Stripe API Key (required for payments)
STRIPE_API_KEY=sk_test_... # or sk_live_...

# Webhook Secret (required for webhook verification)
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Important Notes:**
- ⚠️ **Never commit these to git**
- 🔒 Keys are read from environment variables only
- 🔐 They are NOT stored in the database
- 👀 Admin panel only shows if they are configured, not the actual values

---

## 📁 Files Created

### Components

```
src/components/admin/
├── subscription/
│   ├── SubscriptionList.tsx     # List all subscriptions
│   ├── SubscriptionShow.tsx     # Show single subscription details
│   └── index.ts                 # Exports
├── StripeConfig.tsx             # Stripe configuration panel
└── SubscriptionStats.tsx        # Subscription statistics cards
```

### API Routes

```
src/app/api/
├── admin/
│   ├── stripe-config/
│   │   └── route.ts             # Check Stripe configuration
│   └── subscription-stats/
│       └── route.ts             # Get subscription statistics
└── userSubscription/
    ├── route.ts                 # List subscriptions (GET)
    └── [userSubscriptionId]/
        └── route.ts             # Get single subscription (GET)
```

---

## 🎨 Dashboard Layout

The admin dashboard now has this structure:

```
┌─────────────────────────────────────────┐
│  Stripe Configuration Panel             │
│  ✓ Shows API key and webhook status     │
└─────────────────────────────────────────┘

┌──────────┬──────────┬──────────┬────────┐
│  Total   │  Active  │ Expired  │  MRR   │
│    10    │     8    │    2     │  $160  │
└──────────┴──────────┴──────────┴────────┘

┌─────────────────────────────────────────┐
│  Welcome Message with Lango Mascot      │
└─────────────────────────────────────────┘

┌──────────┬──────────┬──────────┬────────┐
│ Courses  │  Units   │ Lessons  │ Challs │
└──────────┴──────────┴──────────┴────────┘

┌─────────────────────────────────────────┐
│  Quick Start Guide                      │
└─────────────────────────────────────────┘
```

---

## 🔐 Security Features

### Admin-Only Access

All subscription management features require admin authentication:

```typescript
// Checked on every API call
const { userId } = auth();
if (!userId || !isAdmin(userId)) {
  return new NextResponse("Unauthorized", { status: 403 });
}
```

### Environment Variable Security

- ✅ Keys are never exposed to the client
- ✅ Only status (configured/not configured) is shown
- ✅ API detects test vs live mode automatically
- ✅ No ability to modify keys from admin panel (read from env only)

---

## 📊 How It Works

### Stripe Configuration Check

1. Admin loads dashboard
2. `StripeConfig` component fetches `/api/admin/stripe-config`
3. API checks if `STRIPE_API_KEY` and `STRIPE_WEBHOOK_SECRET` exist
4. Detects mode (test/live) based on key prefix
5. Returns status to frontend
6. Component displays visual indicators

### Subscription Statistics

1. Admin loads dashboard
2. `SubscriptionStats` component fetches `/api/admin/subscription-stats`
3. API queries all subscriptions from database
4. Calculates active vs expired based on `stripeCurrentPeriodEnd`
5. Computes MRR (active subscriptions × $20)
6. Returns stats to frontend
7. Component displays animated cards

### Viewing Subscriptions

1. Admin clicks "Subscriptions" in sidebar
2. React-Admin calls `/api/userSubscription?_page=1&_perPage=25`
3. API returns paginated subscription data
4. List displays with status badges
5. Admin can click to view full details

---

## 🎯 Usage Examples

### Check Stripe Configuration

1. Go to admin dashboard: `/admin`
2. Look at the top panel
3. If yellow warning:
   - Add missing environment variables
   - Redeploy app (if on Vercel)
   - Refresh page

### View Active Subscriptions

1. Click "Subscriptions" in sidebar
2. Green badges = Active
3. Red badges = Expired
4. Click any row to see full details

### Monitor MRR

1. Dashboard shows MRR automatically
2. Updates on each page load
3. Calculation: Active Subscriptions × $20

---

## 🚀 Future Enhancements

Possible additions:
- [ ] Cancel subscription from admin panel
- [ ] Extend subscription manually
- [ ] Refund subscription
- [ ] Email notifications for expiring subscriptions
- [ ] Charts and graphs for subscription trends
- [ ] Export subscription data to CSV
- [ ] Filter by active/expired status
- [ ] Search by user ID or Stripe customer ID

---

## 🐛 Troubleshooting

### "Unable to load Stripe configuration"

**Cause:** API error or missing authentication

**Fix:**
1. Check you're logged in as admin
2. Verify `STRIPE_API_KEY` is set in environment
3. Check browser console for errors
4. Verify admin API route is accessible

### Subscriptions not loading

**Cause:** Database connection issue or permissions

**Fix:**
1. Check database is connected
2. Verify `userSubscription` table exists
3. Check API route `/api/userSubscription` returns 200
4. Look at server logs for errors

### Statistics showing 0

**Cause:** No subscriptions in database yet

**Fix:**
- This is normal if no one has subscribed yet
- Create a test subscription to see data
- Wait for first real subscription

### MRR calculation incorrect

**Current:** Fixed at $20 per subscription

**To Fix:** Update the calculation in:
```typescript
// src/app/api/admin/subscription-stats/route.ts
const mrr = activeSubscriptions * 20; // Change 20 to your price
```

---

## 💡 Pro Tips

1. **Monitor Daily**: Check subscription stats daily for trends
2. **Test Mode First**: Use test mode keys initially
3. **Switch to Live**: When ready, update to live keys in production
4. **Set Alerts**: Use Stripe dashboard for failed payment alerts
5. **Backup Data**: Export subscription data regularly

---

## 📚 Related Documentation

- [Stripe Webhook Setup](./STRIPE_VERCEL_SETUP.md)
- [Admin Panel Design](./docs/)
- Stripe API: https://stripe.com/docs/api

---

**Happy subscription management! 🎉**

