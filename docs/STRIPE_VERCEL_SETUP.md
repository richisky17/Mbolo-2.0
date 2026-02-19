# 🚀 Stripe Webhook Setup for Vercel Production

## Step 1: Deploy to Vercel

```bash
# If you haven't already, install Vercel CLI
npm i -g vercel

# Deploy your app
vercel --prod
```

After deployment, you'll get a URL like: `https://your-app.vercel.app`

---

## Step 2: Create Production Webhook in Stripe Dashboard

### 2.1 Go to Stripe Dashboard
👉 https://dashboard.stripe.com/webhooks

### 2.2 Click "Add endpoint"

### 2.3 Configure the webhook:

**Endpoint URL:**
```
https://your-app.vercel.app/api/webhooks/stripe
```
(Replace `your-app.vercel.app` with your actual Vercel domain)

**Description:**
```
Vercel Production Webhook
```

**Events to send:**
Select these two events:
- ✅ `checkout.session.completed` - When a customer completes checkout
- ✅ `invoice.payment_succeeded` - When subscription payment succeeds

### 2.4 Click "Add endpoint"

---

## Step 3: Get Your Webhook Signing Secret

After creating the webhook:

1. Click on your newly created webhook endpoint
2. Click "Reveal" under "Signing secret"
3. Copy the secret (starts with `whsec_...`)

---

## Step 4: Add Webhook Secret to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add new variable:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_your_production_secret_here`
   - **Environments:** Production, Preview, Development
3. Click "Save"

### Option B: Via Vercel CLI

```bash
vercel env add STRIPE_WEBHOOK_SECRET production
# Paste your webhook secret when prompted
```

---

## Step 5: Redeploy Your App

After adding the environment variable:

```bash
# Trigger a new deployment
vercel --prod

# Or push to your git repository (if auto-deploy is enabled)
git add .
git commit -m "Add Stripe webhook support"
git push
```

---

## Step 6: Test Your Production Webhook

### 6.1 Test from Stripe Dashboard

1. Go to: https://dashboard.stripe.com/webhooks
2. Click on your webhook endpoint
3. Click "Send test webhook"
4. Select `checkout.session.completed`
5. Click "Send test webhook"

You should see:
- ✅ Status: 200 OK
- ✅ Response time: < 1000ms

### 6.2 Test with a Real Payment

1. Go to your production site: `https://your-app.vercel.app/shop`
2. Click "Upgrade" on Unlimited Hearts
3. Use Stripe test card:
   - **Card:** `4242 4242 4242 4242`
   - **Expiry:** Any future date
   - **CVC:** Any 3 digits
4. Complete payment
5. Check if hearts show ∞ (infinity symbol)

---

## 🔍 Debugging Webhook Issues

### Check Webhook Logs in Stripe

1. Go to: https://dashboard.stripe.com/webhooks
2. Click on your endpoint
3. Click "Logs" tab
4. Check for failed attempts (red ❌) or successful ones (green ✅)

### Check Vercel Function Logs

1. Go to: https://vercel.com/your-project
2. Click on your deployment
3. Click "Functions" tab
4. Look for `/api/webhooks/stripe`
5. Check logs for errors

### Common Issues and Solutions

#### ❌ "No function signature found"
**Solution:** Make sure your webhook file is at:
```
src/app/api/webhooks/stripe/route.ts
```

#### ❌ "Webhook signature verification failed"
**Solution:** 
- Verify `STRIPE_WEBHOOK_SECRET` is set correctly in Vercel
- Make sure you're using the production webhook secret (not the CLI one)
- Redeploy after adding the environment variable

#### ❌ "User ID is required"
**Solution:** This is normal for test webhooks from Stripe Dashboard. Real payments will include the userId.

#### ❌ "Database error"
**Solution:** 
- Check your database connection string is set in Vercel
- Verify database is accessible from Vercel's IP addresses

---

## 📊 Monitoring Webhook Health

### Stripe Dashboard
- Events delivered: Should be close to 100%
- Average response time: Should be < 1000ms
- Failed attempts: Should be 0 or minimal

### Vercel Analytics
Monitor your webhook endpoint:
```
/api/webhooks/stripe
```
- Should show 200 status codes
- Average duration < 1s

---

## 🔐 Security Best Practices

### ✅ Always verify webhook signatures
Our code already does this:
```typescript
event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

### ✅ Use environment variables
Never hardcode secrets in your code.

### ✅ Use HTTPS only
Vercel automatically provides HTTPS.

### ✅ Keep webhook secret secure
- Don't commit to git
- Don't share in logs or error messages
- Rotate if compromised

---

## 🎯 Production Checklist

- [ ] App deployed to Vercel
- [ ] Stripe webhook endpoint created with production URL
- [ ] `STRIPE_API_KEY` added to Vercel (use `sk_live_...` for production)
- [ ] `STRIPE_WEBHOOK_SECRET` added to Vercel
- [ ] App redeployed after adding environment variables
- [ ] Test webhook from Stripe Dashboard shows 200 OK
- [ ] Test payment with test card shows infinite hearts
- [ ] Webhook logs in Stripe show successful deliveries

---

## 🆘 Need Help?

If webhooks still don't work:

1. Check Vercel function logs
2. Check Stripe webhook logs
3. Verify all environment variables are set
4. Make sure you redeployed after adding variables
5. Test with `stripe listen --forward-to https://your-app.vercel.app/api/webhooks/stripe` (requires Stripe CLI)

---

## 🚀 Going Live with Real Payments

When ready for production:

1. Activate your Stripe account
2. Switch to **Live mode** in Stripe Dashboard
3. Create new webhook with **Live** keys
4. Update Vercel environment variables with **Live** keys:
   - `STRIPE_API_KEY=sk_live_...`
   - `STRIPE_WEBHOOK_SECRET=whsec_...` (from live webhook)
5. Redeploy
6. Test with a real payment (will charge real money!)

---

## 💡 Pro Tips

### Use Different Webhooks for Each Environment

**Test Mode:**
- Webhook for `https://your-app-staging.vercel.app`
- Use test API keys

**Live Mode:**
- Webhook for `https://your-app.vercel.app`
- Use live API keys

### Enable Webhook Retry
Stripe automatically retries failed webhooks for up to 3 days.

### Monitor Webhook Health
Set up alerts in Stripe for failed webhooks.

---

**Good luck with your deployment! 🎉**

