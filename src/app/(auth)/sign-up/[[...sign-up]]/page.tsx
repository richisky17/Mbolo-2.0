import { SignUp } from "@clerk/nextjs";

const signUpAppearance = {
  elements: {
    rootBox: {
      width: "100%",
      maxWidth: "28rem",
    },
    card: {
      borderRadius: "1.5rem",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      border: "2px solid #d1fae5",
      background: "linear-gradient(to bottom, #ffffff, #f0fdf4)",
    },
    headerTitle: {
      fontSize: "2rem",
      fontWeight: "800",
      background: "linear-gradient(to right, #059669, #0d9488)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    headerSubtitle: {
      color: "#6b7280",
      fontSize: "0.9375rem",
    },
    formButtonPrimary: {
      background: "linear-gradient(to right, #059669, #0d9488)",
      borderRadius: "0.75rem",
      fontSize: "0.9375rem",
      fontWeight: "600",
      padding: "0.75rem 1.5rem",
      transition: "all 0.2s",
      "&:hover": {
        background: "linear-gradient(to right, #047857, #0f766e)",
        transform: "translateY(-2px)",
        boxShadow: "0 10px 20px rgba(5, 150, 105, 0.3)",
      },
    },
    formFieldInput: {
      borderRadius: "0.75rem",
      border: "2px solid #d1fae5",
      padding: "0.75rem 1rem",
      fontSize: "0.9375rem",
      transition: "all 0.2s",
      "&:focus": {
        borderColor: "#10b981",
        boxShadow: "0 0 0 4px rgba(16, 185, 129, 0.1)",
      },
    },
  },
};

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30">
      <div className="w-full max-w-md px-4">
        <SignUp 
          path="/sign-up" 
          appearance={signUpAppearance}
          routing="path"
        />
      </div>
    </main>
  );
}
