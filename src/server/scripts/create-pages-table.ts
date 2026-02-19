import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Creating pages table and seeding initial pages...");

    // Create page_status enum
  await sql`
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'page_status') THEN
      CREATE TYPE page_status AS ENUM ('draft', 'published');
    END IF;
  END $$;
`;

    // Create pages table
    await sql`
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT 'en',
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        meta_description TEXT,
        page_status page_status NOT NULL DEFAULT 'draft',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        UNIQUE(slug, language)
      );
    `;

    // Seed initial pages
    const initialPages = [
      {
        slug: "features",
        language: "en",
        title: "Features",
        content: `<h1>Why Choose Mbolo?</h1>
        
<p>Experience the most effective and enjoyable way to learn a new language. Our platform combines cutting-edge technology with proven learning methods to help you achieve fluency faster.</p>

<h2>Smart Learning</h2>
<p>AI-powered lessons adapt to your learning style and pace for maximum retention. Our intelligent system tracks your progress and adjusts difficulty to keep you challenged but not overwhelmed.</p>

<h2>Super Fast</h2>
<p>Quick 5-minute lessons that fit perfectly into your busy schedule. Learn on-the-go whenever you have a spare moment - during your commute, coffee break, or before bed.</p>

<h2>Gamified Fun</h2>
<p>Earn points, unlock achievements, and compete with friends while learning. Our gamification system keeps you motivated and makes learning feel like playing a game.</p>

<h2>Join the Community</h2>
<p>Connect with millions of learners and native speakers worldwide. Practice with real people, join study groups, and share your progress with friends.</p>

<h2>8 Languages</h2>
<p>Choose from Spanish, French, Japanese, Italian, and more languages. Our comprehensive course library covers everything from beginner basics to advanced conversation.</p>

<h2>Proven Results</h2>
<p>See real progress with our scientifically-backed teaching methods. Studies show that learners using Mbolo improve their language skills 40% faster than traditional methods.</p>

<h2>Premium Features</h2>
<ul>
  <li><strong>Unlimited Hearts:</strong> Never run out of learning energy</li>
  <li><strong>Offline Mode:</strong> Download lessons and learn without internet</li>
  <li><strong>Advanced Analytics:</strong> Detailed insights into your progress</li>
  <li><strong>Priority Support:</strong> Get help when you need it</li>
  <li><strong>Ad-Free Experience:</strong> Focus on learning without distractions</li>
</ul>

<p>Start your language learning journey today and unlock a world of possibilities!</p>`,
        metaDescription: "Discover Mbolo's powerful features: AI-powered learning, gamification, 8 languages, and proven results.",
        status: "published"
      },
      {
        slug: "about-us",
        language: "en",
        title: "About Us",
        content: `<h1>About Mbolo</h1>
        
<p>Welcome to Mbolo, the world's leading language learning platform! We believe that learning a new language should be fun, effective, and accessible to everyone.</p>

<h2>Our Mission</h2>
<p>Our mission is to make language learning free, fun, and effective for everyone. We combine the power of AI, gamification, and scientific research to create the most engaging language learning experience possible.</p>

<h2>Our Story</h2>
<p>Founded in 2024, Mbolo has grown from a small startup to a platform used by millions of learners worldwide. We're passionate about breaking down language barriers and connecting people across cultures.</p>

<h2>What Makes Us Different</h2>
<ul>
  <li>AI-powered personalized learning</li>
  <li>Gamified lessons that keep you motivated</li>
  <li>Quick 5-minute lessons that fit any schedule</li>
  <li>Free to use with optional premium features</li>
  <li>8 languages to choose from</li>
</ul>

<p>Join our community of over 10 million learners today!</p>`,
        metaDescription: "Learn about Mbolo's mission to make language learning free, fun, and effective for everyone.",
        status: "published"
      },
      {
        slug: "contact",
        language: "en",
        title: "Contact Us",
        content: `<h1>Contact Us</h1>
        
<p>We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, our team is here to help.</p>

<h2>Get in Touch</h2>
<p>For general inquiries, support, or partnership opportunities, please reach out to us:</p>

<ul>
  <li><strong>Email:</strong> hello@Mbolo.com</li>
  <li><strong>Support:</strong> support@Mbolo.com</li>
  <li><strong>Partnerships:</strong> partnerships@Mbolo.com</li>
  <li><strong>Press:</strong> press@Mbolo.com</li>
</ul>

<h2>Support Hours</h2>
<p>Our support team is available 24/7 to help you with any questions or issues you might have.</p>

<h2>Follow Us</h2>
<p>Stay connected with us on social media:</p>
<ul>
  <li>Facebook: @MboloApp</li>
  <li>Twitter: @MboloApp</li>
  <li>Instagram: @MboloApp</li>
  <li>LinkedIn: Mbolo</li>
</ul>

<h2>Feedback</h2>
<p>Your feedback helps us improve! If you have suggestions or ideas, please don't hesitate to reach out. We read every message and are constantly working to make Mbolo better.</p>

<p>Thank you for being part of the Mbolo community!</p>`,
        metaDescription: "Contact Mbolo for support, partnerships, press inquiries, or general questions. We're here to help!",
        status: "published"
      },
      {
        slug: "privacy-policy",
        language: "en",
        title: "Privacy Policy",
        content: `<h1>Privacy Policy</h1>
        
<p><strong>Last updated: ${new Date().toLocaleDateString()}</strong></p>

<h2>Introduction</h2>
<p>At Mbolo, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>

<h2>Information We Collect</h2>
<p>We collect information that you provide directly to us, including:</p>
<ul>
  <li>Account information (name, email, password)</li>
  <li>Profile information</li>
  <li>Learning progress and statistics</li>
  <li>Usage data and analytics</li>
</ul>

<h2>How We Use Your Information</h2>
<p>We use your information to:</p>
<ul>
  <li>Provide and improve our services</li>
  <li>Personalize your learning experience</li>
  <li>Send you updates and notifications</li>
  <li>Analyze usage patterns</li>
</ul>

<h2>Data Security</h2>
<p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

<h2>Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please contact us at privacy@Mbolo.com</p>`,
        metaDescription: "Read Mbolo's privacy policy to understand how we collect, use, and protect your personal information.",
        status: "published"
      },
      {
        slug: "terms-of-service",
        language: "en",
        title: "Terms of Service",
        content: `<h1>Terms of Service</h1>
        
<p><strong>Last updated: ${new Date().toLocaleDateString()}</strong></p>

<h2>Agreement to Terms</h2>
<p>By accessing or using Mbolo, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

<h2>Use License</h2>
<p>Permission is granted to temporarily download one copy of Mbolo's materials for personal, non-commercial transitory viewing only.</p>

<h2>User Accounts</h2>
<p>When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding your password and for all activities under your account.</p>

<h2>Intellectual Property</h2>
<p>The service and its original content, features, and functionality are owned by Mbolo and are protected by international copyright, trademark, and other intellectual property laws.</p>

<h2>Termination</h2>
<p>We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of these Terms.</p>

<h2>Contact Us</h2>
<p>If you have any questions about these Terms, please contact us at legal@Mbolo.com</p>`,
        metaDescription: "Read Mbolo's terms of service to understand the rules and regulations for using our platform.",
        status: "published"
      },
      {
        slug: "cookie-policy",
        language: "en",
        title: "Cookie Policy",
        content: `<h1>Cookie Policy</h1>
        
<p><strong>Last updated: ${new Date().toLocaleDateString()}</strong></p>

<h2>What Are Cookies</h2>
<p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience.</p>

<h2>How We Use Cookies</h2>
<p>We use cookies for the following purposes:</p>
<ul>
  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
  <li><strong>Analytics Cookies:</strong> Help us understand how you use our website</li>
  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
  <li><strong>Marketing Cookies:</strong> Track your activity for advertising purposes</li>
</ul>

<h2>Managing Cookies</h2>
<p>You can control and manage cookies through your browser settings. However, please note that disabling cookies may affect the functionality of our website.</p>

<h2>Contact Us</h2>
<p>If you have questions about our use of cookies, please contact us at privacy@Mbolo.com</p>`,
        metaDescription: "Learn about how Mbolo uses cookies to improve your experience on our platform.",
        status: "published"
      },
      {
        slug: "help-center",
        language: "en",
        title: "Help Center",
        content: `<h1>Help Center</h1>
        
<p>Welcome to the Mbolo Help Center! Find answers to common questions and learn how to get the most out of your language learning journey.</p>

<h2>Getting Started</h2>
<h3>How do I create an account?</h3>
<p>Click the "Get Started" button on our homepage and sign up with your email or social media account.</p>

<h3>How do I choose a language?</h3>
<p>After signing up, you'll be prompted to select from over 50 available languages. You can change your active language anytime from your profile.</p>

<h2>Learning</h2>
<h3>How long are the lessons?</h3>
<p>Each lesson takes about 5-10 minutes to complete, making it easy to fit learning into your daily routine.</p>

<h3>What happens if I lose all my hearts?</h3>
<p>When you run out of hearts, you'll need to wait for them to refill or purchase the Unlimited Hearts feature in the shop.</p>

<h2>Account & Billing</h2>
<h3>Is Mbolo free?</h3>
<p>Yes! Mbolo is free to use. We also offer a premium subscription with unlimited hearts and additional features.</p>

<h3>How do I cancel my subscription?</h3>
<p>You can manage your subscription from your account settings at any time.</p>

<h2>Still Need Help?</h2>
<p>Contact our support team at support@Mbolo.com</p>`,
        metaDescription: "Get help with Mbolo. Find answers to common questions about lessons, accounts, and more.",
        status: "published"
      }
    ];

    for (const page of initialPages) {
      await sql`
        INSERT INTO pages (slug, language, title, content, meta_description, page_status)
        VALUES (${page.slug}, ${page.language || 'en'}, ${page.title}, ${page.content}, ${page.metaDescription}, ${page.status})
        ON CONFLICT (slug, language) DO NOTHING
      `;
    }

    console.log("✅ Pages table created and seeded successfully!");
  } catch (error) {
    console.error("❌ Error creating pages table:", error);
    throw error;
  }
};

main();

