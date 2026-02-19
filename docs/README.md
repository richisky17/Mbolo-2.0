# 📚 Lango Documentation

Welcome to the Lango documentation! This folder contains comprehensive guides to help you install, configure, and customize your language learning platform.

## 📖 Documentation Files

### 🚀 Getting Started

#### [Quick Start Guide](quick-start.html)
**Start here!** Get up and running in under 10 minutes.
- Step-by-step installation
- Essential configuration
- Database setup
- Admin access

#### [Complete Documentation](index.html)
**Full reference guide** covering everything you need to know.
- Features overview
- Tech stack details
- Installation guide
- Configuration
- Database setup
- Admin panel guide
- Usage instructions
- Customization options
- Deployment guide
- Troubleshooting
- API reference

---

### 👨‍💼 Admin Panel Documentation (v2.0)

#### [Subscription Management](ADMIN_SUBSCRIPTION_MANAGEMENT.md)
**Manage customer subscriptions** from the admin panel.
- View all subscriptions (active/expired)
- Track Monthly Recurring Revenue (MRR)
- User information with email display
- Subscription details and timeline
- Real-time statistics dashboard

#### [Settings Management](ADMIN_SETTINGS_GUIDE.md)
**Configure your application** without redeployment.
- Stripe API key configuration
- Webhook secret management
- Dynamic subscription pricing
- Currency and billing interval settings
- Database-driven configuration system
- Environment variable fallbacks

#### [Changelog System](CHANGELOG_FEATURE.md)
**Track all admin activities** with comprehensive audit trail.
- Activity logging (create, update, delete)
- Resource tracking (courses, lessons, etc.)
- Admin user identification
- Change history with JSON diffs
- Visual timeline and reporting

---

### 💳 Stripe Integration

#### [Stripe & Vercel Setup](STRIPE_VERCEL_SETUP.md)
**Deploy payments to production** with complete guide.
- Webhook configuration
- Environment variable setup
- Testing procedures
- Production deployment checklist
- Troubleshooting common issues

---

## 🎯 Quick Reference

| Document | Purpose | Time Required |
|----------|---------|---------------|
| `quick-start.html` | Fast setup for getting started | ~10 minutes |
| `index.html` | Complete reference documentation | ~30 minutes |
| `ADMIN_SUBSCRIPTION_MANAGEMENT.md` | Subscription management guide | ~15 minutes |
| `ADMIN_SETTINGS_GUIDE.md` | Settings & configuration | ~20 minutes |
| `STRIPE_VERCEL_SETUP.md` | Production payment setup | ~15 minutes |
| `CHANGELOG_FEATURE.md` | Activity tracking system | ~10 minutes |

## 🔧 How to Use This Documentation

### For New Users
1. **Start with** `quick-start.html` to get your app running
2. **Then explore** `index.html` for deeper understanding and customization options
3. **Review** admin panel docs for subscription and settings management

### For Experienced Developers
- Jump directly to specific sections in `index.html`
- Use the sidebar navigation for quick access
- Check the API reference for integration details
- Explore admin panel features in markdown documentation

### For Production Deployment
1. **Read** `STRIPE_VERCEL_SETUP.md` for payment setup
2. **Configure** settings using `ADMIN_SETTINGS_GUIDE.md`
3. **Monitor** subscriptions with `ADMIN_SUBSCRIPTION_MANAGEMENT.md`
4. **Track** changes with `CHANGELOG_FEATURE.md`

## 📋 What You'll Need

Before starting, make sure you have:
- ✅ Node.js 18+ installed
- ✅ A code editor (VS Code recommended)
- ✅ Free accounts on:
  - [Neon](https://neon.tech) - PostgreSQL database
  - [Clerk](https://clerk.com) - Authentication
  - [Stripe](https://stripe.com) - Payments (optional)

## 🌟 Key Features

Lango includes:
- 🔐 **Authentication** - Secure user auth with Clerk (beautiful emerald/teal themed forms)
- 🎮 **Interactive Learning** - Engaging challenges
- ❤️ **Hearts System** - Gamified experience
- 🏆 **Leaderboard** - Competitive learning
- 🛒 **Shop** - In-app purchases
- 👨‍💼 **Admin Panel v2.0** - Complete management system
  - 💳 Subscription tracking with MRR
  - ⚙️ Dynamic settings configuration
  - 📜 Activity changelog/audit trail
  - 🎨 Modern, professional interface
  - 🎨 Customized authentication forms
  - 🚫 Automatic banner removal
- 📱 **Responsive** - Works on all devices
- 🌍 **Multi-language** - Support multiple courses
- 💰 **Stripe Integration** - Subscription payments

## 📂 Project Structure

```
Lango/
├── docs/                                        # 📚 You are here!
│   ├── README.md                               # This file
│   ├── quick-start.html                        # Quick start guide
│   ├── index.html                              # Complete documentation
│   ├── ADMIN_SUBSCRIPTION_MANAGEMENT.md        # Subscription guide
│   ├── ADMIN_SETTINGS_GUIDE.md                 # Settings guide
│   ├── STRIPE_VERCEL_SETUP.md                  # Stripe deployment
│   └── CHANGELOG_FEATURE.md                    # Changelog system
├── public/                                      # Static assets
├── src/
│   ├── app/                                    # Next.js routes
│   │   ├── admin/                              # Admin panel
│   │   └── api/                                # API routes
│   ├── components/                             # React components
│   │   └── admin/                              # Admin components
│   ├── lib/                                    # Utilities
│   └── server/                                 # Server code
│       ├── db/                                 # Database
│       └── scripts/                            # Migration scripts
├── CHANGELOG.md                                # Version history
├── .env.local                                  # Environment variables
└── package.json                                # Dependencies
```

## 🆘 Getting Help

1. **Check** the [Troubleshooting section](index.html#troubleshooting) in the full docs
2. **Review** browser console and terminal logs for errors
3. **Verify** all environment variables are set correctly
4. **Contact** support through CodeCanyon

## 💡 Tips

- Always use the **Quick Start** guide first if you're new
- Keep your `.env.local` file secure and never commit it
- Use the **admin panel** instead of editing the database directly
- Check the **API reference** if you're building integrations

## 🚀 Ready to Start?

### New Installation
Open `quick-start.html` in your browser and follow the step-by-step guide!

### Existing Installation (Upgrading to v2.0)
Run the migration scripts to add new features:
```bash
# Create settings table
npx tsx src/server/scripts/create-settings-table.ts

# Create changelog table
npx tsx src/server/scripts/create-changelog-table.ts
```

---

## 🎉 What's New in v2.0?

### Admin Panel Overhaul
- ✨ **Modern UI/UX** - Complete redesign with professional interface
- 💳 **Subscription Management** - Track customers, MRR, and renewal dates
- ⚙️ **Dynamic Settings** - Configure Stripe and pricing without redeployment
- 📜 **Activity Logging** - Comprehensive audit trail for all changes
- 🎨 **Icon System** - Professional Lucide icons throughout
- 📊 **Real-time Stats** - Dashboard with animated statistics cards
- 🦜 **Lango Mascot** - Animated mascot on dashboard

### Authentication & UI Customization
- 🎨 **Customized Clerk Forms** - Beautiful emerald/teal themed login and signup forms
  - Gradient backgrounds matching homepage design
  - Custom input fields with emerald focus states
  - Rounded corners and modern shadows
  - Fully responsive layout
- 🚫 **Clerk Banner Removal** - Automatic hiding of development banner
  - CSS-based banner hiding
  - Smart detection to avoid interfering with modals
  - Client-side component for dynamic removal

### Key Improvements
- 🔧 **Fixed Stripe Webhooks** - Proper payment event handling
- 🎨 **600+ Lines of CSS** - Custom styling for modern look
- 📱 **Responsive Design** - Works perfectly on mobile and tablet
- 🔒 **Enhanced Security** - Masked values, admin-only access
- 📚 **1,500+ Lines of Documentation** - Comprehensive guides
- 🎨 **Emerald/Teal Theme** - Consistent color scheme throughout the app

### Migration Required
If upgrading from v1.x, see [CHANGELOG.md](../CHANGELOG.md) for details.

---

**Documentation Links:**
- [Quick Start Guide](quick-start.html) - Get started fast
- [Complete Documentation](index.html) - Full reference
- [Admin Panel Guides](ADMIN_SUBSCRIPTION_MANAGEMENT.md) - v2.0 features
- [Stripe Setup](STRIPE_VERCEL_SETUP.md) - Production deployment
- [Version History](../CHANGELOG.md) - See what's new

---

<p align="center">
  <strong>🦜 Lango - Interactive Language Learning Platform</strong><br>
  Built with Next.js 14, React, and TypeScript<br>
  <em>Admin Panel v2.0 - Now with Subscription Management & Dynamic Settings</em>
</p>

