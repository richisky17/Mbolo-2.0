# Changelog

All notable changes to the Lango Admin Panel will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2025-10-30

### 🎉 Major Release - Complete Admin Panel Overhaul

This release represents a complete modernization of the admin panel with comprehensive new features, improved UI/UX, and enhanced functionality.

---

## ✨ Added

#### **Authentication & UI Customization**
- **Customized Clerk Login/Signup Forms** - Beautiful emerald/teal themed authentication forms
  - Gradient background matching homepage design
  - Emerald/teal gradient buttons with hover effects
  - Custom input fields with emerald focus states
  - Rounded corners and modern shadows
  - Gradient text for titles
  - Responsive layout for all screen sizes
- **Clerk Development Banner Removal** - Automatic hiding of "Secured by Clerk" development banner
  - CSS-based banner hiding
  - Smart detection to avoid interfering with modals
  - Client-side component for dynamic banner removal

#### **Navigation & Routing**
- **Functional Header Navigation** - Features, About, and Contact links now properly route to their respective pages
- **Clickable Logo** - Logo and mascot in header now link to home page for better navigation
- **Features Page** - Created dedicated Features page accessible at `/features` with CMS management support

#### **Social Media Management**
- **Social Media Links System** - Complete admin panel integration for managing social media links
  - Database table for storing social media links (platform, URL, display order)
  - Admin panel interface with full CRUD operations
  - Support for multiple platforms: Facebook, Twitter, Instagram, YouTube, LinkedIn, TikTok, Discord
  - Dynamic display order control
- **Footer Integration** - Footer now dynamically displays social media links from database
  - Automatic icon rendering based on platform
  - Responsive icon layout
  - Links open in new tabs with proper security attributes
- **API Endpoints** - RESTful API for social media links management
  - `GET /api/social-media-links` - Public endpoint for fetching links
  - `POST /api/social-media-links` - Admin-only endpoint for creating links
  - `PUT /api/social-media-links/[id]` - Admin-only endpoint for updating links
  - `DELETE /api/social-media-links/[id]` - Admin-only endpoint for deleting links

#### **Content Management**
- **Features Page Content** - Seeded default Features page with comprehensive content about platform features
- **Contact Page Content** - Seeded default Contact page with contact information and social links

### **Admin Panel Design System**
- **Custom Theme** - Implemented Material-UI theme with green primary color (#16a34a) matching frontend
- **Custom Layout** - Created `AdminLayout` with custom AppBar and sidebar menu
- **Custom Dashboard** - Beautiful welcome screen with animated cards and quick access links
- **Lango Branding** - Added Lango logo and mascot throughout admin interface
- **Responsive Design** - Fully responsive layout that works on all screen sizes

### **Dashboard Features**
- **Welcome Hero Section** - Gradient background with animated Lango mascot
- **Quick Access Cards** - 5 interactive cards for Courses, Units, Lessons, Challenges, and Challenge Options
  - Hover animations with lift effect
  - Color-coded icons (Books, Grid, Graduation Cap, Question, List)
  - Emoji indicators for each section
  - Direct navigation links
- **Quick Start Guide** - Step-by-step numbered guide with emojis
- **Subscription Statistics** - Real-time stats showing:
  - Total Subscriptions
  - Active Subscriptions  
  - Expired Subscriptions
  - Monthly Recurring Revenue (MRR)
- **Animated Cards** - Floating animation effect on all dashboard cards

### **Subscription Management System**
- **Subscriptions Resource** - Complete CRUD interface for viewing subscriptions
- **List View Features**:
  - Username display with email (fetched from Clerk)
  - Status badges (Active/Expired) with color coding
  - Customer IDs and Price IDs
  - Period end dates
  - Click to view detailed information
- **Detail View Features**:
  - Color-coded hero card (green for active, red for expired)
  - Username with prominent status badge
  - Stats cards showing period end, days remaining, and status
  - Stripe details section with formatted IDs
  - Visual timeline showing subscription lifecycle
  - "Created" and "Renews/Expired" milestones
- **Subscription Statistics API** - Real-time calculation of active/expired subscriptions and MRR
- **Automatic User Enrichment** - Integration with Clerk to show readable usernames instead of user IDs

### **Settings Management System**
- **Settings Resource** - Database-stored configuration management
- **Configurable Settings**:
  - Stripe API Key
  - Stripe Webhook Secret
  - Subscription Price
  - Subscription Currency
  - Billing Interval (month/year)
- **List View Features**:
  - Professional Lucide icons for each setting type
  - Color-coded icon boxes with gradients
  - Masked sensitive values (API keys show first 12 chars)
  - Value badges with color coding:
    - Price: Green badge with dollar sign
    - Currency: Blue badge
    - Interval: Purple badge
  - Lock icon indicator for secure values
  - Last updated timestamps
- **Create/Edit Features**:
  - Hero header with setting-specific icon and description
  - Dropdown selection for setting types
  - Multiline text input for values
  - Helper text with examples
  - Real-time updates (no redeploy needed)
- **Settings Priority System**:
  1. Database settings (highest priority)
  2. Environment variables (fallback)
  3. Default values (final fallback)
- **Dynamic Pricing** - Subscription price changes take effect immediately for new subscriptions

### **Changelog System**
- **Activity Tracking** - Comprehensive audit trail of all admin actions
- **Tracked Actions**:
  - Created (green)
  - Updated (blue)
  - Deleted (red)
- **Tracked Resources**:
  - Courses
  - Units
  - Lessons
  - Challenges
  - Challenge Options
  - Subscriptions
  - Settings
- **List View Features**:
  - Color-coded action icons
  - Resource type icons
  - Admin user avatars
  - Full timestamps
  - Click to view details
- **Detail View Features**:
  - Hero card with action type and resource name
  - Resource info card with icon
  - Timestamp card with date and time
  - Admin user card with full user ID
  - Changes JSON display (before/after values)
- **Read-Only Design** - Ensures audit trail integrity

### **Enhanced List Components**
- **Course List**:
  - Flag image display with borders
  - Improved cell alignment
  - Custom pagination
- **Unit List**:
  - Green bold order numbers
  - Truncated descriptions with ellipsis
  - Bold titles
- **Lesson List**:
  - Color-coded order numbers
  - Bold titles
- **Challenge List**:
  - Styled type chips with colors
  - Truncated questions
  - Order numbering
- **Challenge Option List**:
  - Image display with rounded borders
  - Green checkmark for correct answers
  - Truncated audio source paths
  - Image thumbnails

### **Enhanced Form Components**
All create/edit forms now include:
- Full-width inputs
- Helper text and placeholders
- Default values where applicable
- Disabled ID fields (for edit)
- Improved labels and descriptions
- Consistent spacing and margins
- Multiline text areas for long content

### **Custom Components**
- **AdminLayout** - Custom layout with branded AppBar and Menu
- **AdminAppBar** - White background, "Lango Admin Panel" branding, styled menu button
- **AdminMenu** - "Back to App" button with collapse support
- **AdminTheme** - Complete Material-UI theme customization
- **AdminDashboard** - Animated dashboard with quick access cards
- **StripeConfig** - Configuration status panel (removable)
- **SubscriptionStats** - Real-time statistics cards with animations
- **CustomPagination** - Professional pagination handling "NaN" edge cases

### **Icon System**
- **Resource Icons** (Lucide React):
  - BookOpen (Courses)
  - Grid3x3 (Units)
  - GraduationCap (Lessons)
  - HelpCircle (Challenges)
  - List (Challenge Options)
  - CreditCard (Subscriptions)
  - Settings (Settings)
  - History (Changelog)
- **Action Icons**:
  - Plus (Created)
  - Edit (Updated)
  - Trash2 (Deleted)
- **UI Icons**:
  - Key, Lock, DollarSign, Banknote, Calendar
  - User, Clock, FileText, TrendingUp
  - CheckCircle, XCircle

---

## 🔧 Changed

#### **Content Updates**
- **Language Count** - Updated from "50+ Languages" to "8 Languages" to reflect actual platform offerings
  - Updated across all 8 locale files (English, Spanish, French, German, Italian, Portuguese, Japanese, Chinese)
  - Updated homepage statistics section
  - Updated Features page content
  - Updated CMS seed scripts

#### **Mobile Responsiveness**
- **Header Improvements** - Enhanced mobile header responsiveness
  - Reduced header height on mobile (h-16 vs h-20)
  - Smaller logo and text sizes on mobile screens
  - Improved spacing and padding for mobile devices
  - Responsive button sizes and text
  - Better handling of overflow and truncation
- **Mobile Apps Section** - Fixed mobile layout issues
  - Form inputs and buttons now stack vertically on mobile
  - App store badges are full-width on mobile
  - Early access form properly responsive with vertical stacking
  - Reduced padding and text sizes for mobile screens
  - Improved touch targets and spacing

### **Stripe Integration**
- **Fixed Webhook Handler** - Corrected `invoice.payment_succeeded` event handling
  - Changed from treating event as Session to Invoice
  - Added proper error handling
  - Added comprehensive logging
- **Dynamic Pricing** - Subscription creation now uses database settings
  - Price from settings (default $20)
  - Currency from settings (default USD)
  - Interval from settings (default month)
- **MRR Calculation** - Now uses configured price instead of hardcoded $20

### **Admin Panel Styling**
- **Complete CSS Overhaul** - 600+ lines of custom CSS in `admin.css`:
  - Sidebar collapse animations
  - Menu item transitions
  - Table styling with alternating rows
  - Hover effects throughout
  - Pagination redesign
  - Button styling (Create, Delete, Export)
  - Form styling
  - Card styling
  - Bulk actions toolbar
  - Empty states
  - Dialogs and modals
  - Loading indicators
  - Notifications

- **Removed Excessive Borders** - Replaced 2-3px borders with 1px borders or shadows
- **Border Radius** - Consistent 8px-12px border radius throughout
- **Color Palette**:
  - Primary Green: #16a34a
  - Secondary Blue: #0ea5e9
  - Purple: #8b5cf6
  - Orange: #f59e0b
  - Pink: #ec4899
  - Red: #dc2626
  - Gray shades for text and backgrounds

### **Pagination Improvements**
- **Professional Styling** - Compact number box, proper spacing
- **NaN Handling** - Shows "No records" instead of "1-NaN of NaN"
- **Dropdown Styling** - Fixed dropdown positioning and clickability
- **Equal Spacing** - Balanced left/right spacing
- **Remove "NaN" Display** - Hides invalid pagination text

### **Button Redesign**
- **Create Button** - Flat design with shadow, no border
- **Delete Button** - Red with white text, proper contrast
- **Export Button** - Gray with shadow, matches Create style
- **Bulk Actions** - White text/icons on colored backgrounds
- **Consistent Styling** - All buttons follow same design language

### **Sidebar Enhancements**
- **Collapse Functionality** - Smooth animations when toggling
- **Menu Item Text** - Fades out when collapsed
- **"Back to App" Button**:
  - Green background with hover effect
  - Text hidden when sidebar collapsed
  - Proper spacing from menu items
  - 1px border instead of thick border

### **Table Improvements**
- **Alternating Row Colors** - Light gray for better readability
- **Hover Effects** - Subtle highlight on row hover
- **Selected Rows** - Green highlight for selected items
- **Cell Alignment** - Vertical middle alignment
- **Cell Padding** - Consistent 14px 16px padding

---

## 🛠️ Fixed

#### **Navigation Issues**
- Fixed header navigation links using anchor tags instead of proper routing
- Fixed logo not being clickable
- Fixed Features, About, and Contact pages not being accessible

#### **Mobile Layout Issues**
- Fixed mobile apps section breaking on small screens
- Fixed early access form buttons and inputs overflowing on mobile
- Fixed header elements overlapping on mobile devices
- Fixed social media icons display issues

### **Stripe Webhook Issues**
- Fixed `invoice.payment_succeeded` handler treating event as wrong type
- Added try-catch blocks for database operations
- Added comprehensive error logging
- Fixed webhook signature verification error messages

### **Subscription Display Issues**
- Fixed infinite hearts not showing after payment
- Fixed MRR calculation using wrong price
- Fixed subscription status calculation
- Added proper date handling with timezone support

### **Admin UI Issues**
- Fixed delete button visibility (white on white background)
- Fixed bulk actions toolbar overlapping content
- Fixed pagination showing "NaN"
- Fixed dropdown click area in pagination
- Fixed sidebar collapse hiding menu toggle button
- Fixed double borders throughout interface
- Fixed "Back to App" button collision with menu

### **Database Issues**
- Created missing `app_settings` table
- Created missing `changelog` table
- Added proper indexes and constraints

---

## 📚 Documentation

### **New Documentation Files**
1. **STRIPE_VERCEL_SETUP.md** (264 lines)
   - Complete guide for deploying Stripe webhooks to Vercel
   - Step-by-step webhook configuration
   - Environment variable setup
   - Testing procedures
   - Troubleshooting guide
   - Production checklist

2. **ADMIN_SUBSCRIPTION_MANAGEMENT.md** (297 lines)
   - Subscription management overview
   - Feature documentation
   - Security features
   - API reference
   - Troubleshooting guide

3. **ADMIN_SETTINGS_GUIDE.md** (414 lines)
   - Settings management system documentation
   - Quick start guide
   - Database schema
   - Priority system explanation
   - API reference
   - Use cases and examples
   - Best practices

4. **CHANGELOG_FEATURE.md** (200+ lines)
   - Changelog system documentation
   - Visual design explanation
   - Database schema
   - Manual logging examples
   - Future enhancements

---

## 🗄️ Database

### **New Tables**
```sql
-- App Settings Table
CREATE TABLE app_settings (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Changelog Table
CREATE TABLE changelog (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  resource_name TEXT,
  changes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### **Migration Scripts**
- `create-settings-table.ts` - Creates app_settings with defaults
- `create-changelog-table.ts` - Creates changelog table

---

## 🎨 Design System

### **Typography**
- **Headings**: 800-900 font weight
- **Body**: 500-600 font weight
- **Labels**: 500 font weight
- **Code/IDs**: Monospace font family

### **Spacing**
- **Cards**: 20-32px padding
- **Sections**: 24-32px margins
- **Elements**: 12-16px gaps
- **Inputs**: 20px margin-bottom

### **Colors**
- **Text Primary**: #262626
- **Text Secondary**: #737373
- **Text Muted**: #a3a3a3
- **Background**: #ffffff
- **Background Alt**: #f9fafb
- **Border**: #e5e5e5

### **Shadows**
- **Cards**: 0 1px 3px rgba(0,0,0,0.1)
- **Hover**: 0 4px 12px rgba(0,0,0,0.08)
- **Elevation**: 0 8px 16px rgba(0,0,0,0.1)

---

## 📦 Dependencies

### **No New Dependencies Added**
All features implemented using existing packages:
- `react-admin` (existing)
- `@mui/material` (existing)
- `lucide-react` (existing)
- `@clerk/nextjs/server` (existing)
- `stripe` (existing)
- `drizzle-orm` (existing)

---

## 🔐 Security

### **Enhanced Security Features**
- Admin-only access on all new endpoints
- User ID tracking on all changelog entries
- Masked sensitive values in UI (API keys)
- Read-only changelog for audit integrity
- Environment variable fallbacks
- Webhook signature verification with logging

---

## 🚀 Performance

### **Optimizations**
- Clerk API calls for user enrichment (cached per request)
- Database queries use proper indexing
- Pagination limits large datasets
- Lazy loading of components
- CSS transitions use GPU acceleration

---

## 📱 Responsive Design

### **Mobile Support**
- Sidebar collapses on mobile
- Cards stack vertically on small screens
- Tables scroll horizontally if needed
- Touch-friendly hover states
- Readable font sizes on all devices

---

## 🧪 Testing

### **Local Development Setup**
- Stripe CLI integration
- Webhook listener configuration
- Test card: 4242 4242 4242 4242
- Environment variable validation
- Database migration scripts

---

## 🎯 Future Enhancements

### **Planned Features**
- [ ] Automatic changelog logging on CRUD operations
- [ ] CSV export for subscriptions and changelog
- [ ] Email notifications for critical changes
- [ ] Advanced filtering and search
- [ ] Charts and analytics dashboard
- [ ] Role-based permissions (Super Admin, Editor, Viewer)
- [ ] Bulk operations (bulk delete, bulk update)
- [ ] Restore/rollback functionality
- [ ] API rate limiting
- [ ] Two-factor authentication for admin access

---

## 👥 Contributors

- **Admin Panel Redesign**: Complete UI/UX overhaul
- **Subscription System**: Management and tracking
- **Settings System**: Database-driven configuration
- **Changelog System**: Audit trail implementation
- **Documentation**: Comprehensive guides and references

---

## 📝 Notes

### **Breaking Changes**
- None - all changes are backward compatible

### **Migration Required**
- Run `npx tsx src/server/scripts/create-settings-table.ts`
- Run `npx tsx src/server/scripts/create-changelog-table.ts`

### **Environment Variables**
- Existing environment variables still work as fallback
- New database settings take precedence
- **OpenAI API Key** - Added `OPENAI_API_KEY` for AI pronunciation features (optional)
  - Required for AI voice generation in pronunciation coach
  - Required for AI-generated pronunciation practice texts
  - Add to `.env.local` if using pronunciation features

---

## 🔗 Links

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Documentation](./docs/)

---

## ⚡ Quick Start

### **To Use New Features**
```bash
# 1. Run migrations
npx tsx src/server/scripts/create-settings-table.ts
npx tsx src/server/scripts/create-changelog-table.ts

# 2. Start dev server
npm run dev

# 3. Access admin panel
open http://localhost:3000/admin

# 4. Configure settings (optional)
# Go to Settings → Add Stripe keys and pricing

# 5. View subscriptions
# Go to Subscriptions → See all active/expired subs

# 6. Check activity
# Go to Changelog → View all admin actions
```

---

## 📊 Statistics

### **Lines of Code**
- **New Components**: ~3,500 lines
- **Custom CSS**: ~600 lines  
- **API Routes**: ~400 lines
- **Documentation**: ~1,500 lines
- **Total**: ~6,000+ lines added

### **Files Modified/Created**
- **Components**: 25+ files
- **API Routes**: 10+ files
- **Documentation**: 4 files
- **Scripts**: 2 migration files
- **CSS**: 1 comprehensive stylesheet

---

## 🎉 Highlights

### **Most Impactful Changes**
1. ✨ **Complete Admin Panel Redesign** - Modern, professional, and user-friendly
2. 💳 **Subscription Management** - Full visibility into customer subscriptions
3. ⚙️ **Database-Driven Settings** - Change configuration without redeployment
4. 📜 **Audit Trail** - Complete activity tracking for compliance
5. 🎨 **Consistent Design Language** - Cohesive look and feel throughout

### **Best New Features**
- 🌟 Animated dashboard with Lango mascot
- 💰 Real-time MRR calculation
- 🔒 Secure settings with masked values
- 📊 Beautiful subscription detail pages
- 🎨 Professional icon system throughout

---

**Version 2.0.0 represents a complete transformation of the admin panel experience! 🚀**

---

*For detailed documentation on specific features, see the individual guide files in the docs folder.*

