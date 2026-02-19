import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/Sonner";

import { ExitModal, HeartsModal, PracticeModal } from "@/components/modals";
import RemoveClerkBanner from "@/components/RemoveClerkBanner";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mbolo",
  description: "Aprende nuevas lengua vernaculas a tu propio ritmo.",
};

const clerkAppearance = {
  elements: {
    rootBox: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      borderRadius: "1rem",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      border: "1px solid #d1fae5",
    },
    headerTitle: {
      fontSize: "1.875rem",
      fontWeight: "700",
      background: "linear-gradient(to right, #059669, #0d9488)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    headerSubtitle: {
      color: "#6b7280",
      fontSize: "0.875rem",
    },
    socialButtonsBlockButton: {
      borderRadius: "0.5rem",
      border: "1px solid #d1fae5",
      transition: "all 0.2s",
      "&:hover": {
        borderColor: "#10b981",
        backgroundColor: "#f0fdf4",
      },
    },
    socialButtonsBlockButtonText: {
      fontWeight: "500",
      color: "#374151",
    },
    formButtonPrimary: {
      background: "linear-gradient(to right, #059669, #0d9488)",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      padding: "0.625rem 1.25rem",
      transition: "all 0.2s",
      "&:hover": {
        background: "linear-gradient(to right, #047857, #0f766e)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
      },
    },
    formFieldInput: {
      borderRadius: "0.5rem",
      border: "1px solid #d1fae5",
      padding: "0.625rem 0.875rem",
      fontSize: "0.875rem",
      transition: "all 0.2s",
      "&:focus": {
        borderColor: "#10b981",
        boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.1)",
      },
    },
    formFieldLabel: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "0.5rem",
    },
    dividerLine: {
      backgroundColor: "#d1fae5",
    },
    dividerText: {
      color: "#6b7280",
      fontSize: "0.875rem",
    },
    footerActionLink: {
      color: "#059669",
      fontWeight: "500",
      "&:hover": {
        color: "#047857",
      },
    },
    identityPreviewEditButton: {
      color: "#059669",
      "&:hover": {
        color: "#047857",
      },
    },
    formResendCodeLink: {
      color: "#059669",
      "&:hover": {
        color: "#047857",
      },
    },
    alertText: {
      fontSize: "0.875rem",
    },
    formFieldErrorText: {
      fontSize: "0.75rem",
      color: "#ef4444",
    },
    otpCodeFieldInput: {
      borderRadius: "0.5rem",
      border: "1px solid #d1fae5",
      "&:focus": {
        borderColor: "#10b981",
        boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.1)",
      },
    },
  },
  variables: {
    colorPrimary: "#059669",
    colorText: "#1f2937",
    colorTextSecondary: "#6b7280",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#1f2937",
    borderRadius: "0.5rem",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased hydrated">
      <ClerkProvider appearance={clerkAppearance}>
        <body
          className={cn(
            "scrollbar-thumb-gray scrollbar-thumb-rounded scrollbar-track-gray-lighter scrollbar-w-4 scrolling-touch",
            font.className
          )}
        >
          {children}
          <RemoveClerkBanner />
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
        </body>
      </ClerkProvider>
    </html>
  );
}
