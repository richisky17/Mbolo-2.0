"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, CreditCard } from "lucide-react";

interface StripeConfigStatus {
  apiKeyConfigured: boolean;
  webhookSecretConfigured: boolean;
  mode: "test" | "live" | "unknown";
}

export const StripeConfig = () => {
  const [config, setConfig] = useState<StripeConfigStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stripe-config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #635bff20 0%, #635bff10 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CreditCard style={{ color: "#635bff", width: "24px", height: "24px" }} />
          </div>
          <p style={{ color: "#737373", margin: 0 }}>Loading Stripe configuration...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div
        style={{
          backgroundColor: "#fef2f2",
          borderRadius: "16px",
          border: "1px solid #fecaca",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
          <XCircle style={{ color: "#dc2626", width: "24px", height: "24px", marginTop: "2px" }} />
          <div>
            <h3 style={{ margin: "0 0 8px 0", color: "#991b1b", fontSize: "1rem", fontWeight: 700 }}>
              Stripe Configuration Error
            </h3>
            <p style={{ margin: 0, color: "#7f1d1d", fontSize: "0.875rem" }}>
              Unable to load Stripe configuration. Please check your environment variables.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const allConfigured = config.apiKeyConfigured && config.webhookSecretConfigured;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        border: `1px solid ${allConfigured ? "#bbf7d0" : "#fde68a"}`,
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "start", gap: "16px", marginBottom: "20px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #635bff20 0%, #635bff10 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #635bff40",
          }}
        >
          <CreditCard style={{ color: "#635bff", width: "28px", height: "28px" }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 4px 0", color: "#262626", fontSize: "1.125rem", fontWeight: 700 }}>
            Stripe Configuration
          </h3>
          <p style={{ margin: 0, color: "#737373", fontSize: "0.875rem" }}>
            Payment processing and subscription management
          </p>
        </div>
        {allConfigured ? (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "12px",
              fontSize: "0.75rem",
              fontWeight: 600,
              backgroundColor: "#dcfce7",
              color: "#047857",
              border: "1px solid #bbf7d0",
            }}
          >
            ✓ Configured
          </span>
        ) : (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "12px",
              fontSize: "0.75rem",
              fontWeight: 600,
              backgroundColor: "#fef3c7",
              color: "#92400e",
              border: "1px solid #fde68a",
            }}
          >
            ⚠ Incomplete
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {config.apiKeyConfigured ? (
            <CheckCircle style={{ color: "#059669", width: "20px", height: "20px" }} />
          ) : (
            <XCircle style={{ color: "#dc2626", width: "20px", height: "20px" }} />
          )}
          <span style={{ fontSize: "0.875rem", color: "#404040", fontWeight: 500 }}>
            API Key ({config.mode === "test" ? "Test Mode" : config.mode === "live" ? "Live Mode" : "Unknown"})
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {config.webhookSecretConfigured ? (
            <CheckCircle style={{ color: "#059669", width: "20px", height: "20px" }} />
          ) : (
            <XCircle style={{ color: "#dc2626", width: "20px", height: "20px" }} />
          )}
          <span style={{ fontSize: "0.875rem", color: "#404040", fontWeight: 500 }}>
            Webhook Secret
          </span>
        </div>
      </div>

      {!allConfigured && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px 16px",
            backgroundColor: "#fef3c7",
            borderRadius: "8px",
            border: "1px solid #fde68a",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "start" }}>
            <AlertCircle style={{ color: "#92400e", width: "16px", height: "16px", marginTop: "2px" }} />
            <p style={{ margin: 0, fontSize: "0.813rem", color: "#78350f", lineHeight: 1.5 }}>
              Add missing environment variables to enable payments:
              {!config.apiKeyConfigured && (
                <span style={{ display: "block", marginTop: "4px" }}>
                  • <code style={{ backgroundColor: "#fde68a", padding: "2px 6px", borderRadius: "4px" }}>STRIPE_API_KEY</code>
                </span>
              )}
              {!config.webhookSecretConfigured && (
                <span style={{ display: "block", marginTop: "4px" }}>
                  • <code style={{ backgroundColor: "#fde68a", padding: "2px 6px", borderRadius: "4px" }}>STRIPE_WEBHOOK_SECRET</code>
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

