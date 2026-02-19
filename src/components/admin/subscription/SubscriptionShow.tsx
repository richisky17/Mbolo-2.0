"use client";

import {
  Show,
  useRecordContext,
} from "react-admin";
import { User, CreditCard, Calendar, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";

const InfoCard = ({ icon: Icon, label, value, valueColor, iconColor, iconBg }: any) => (
  <div
    style={{
      backgroundColor: "white",
      borderRadius: "12px",
      border: "1px solid #e5e5e5",
      padding: "20px",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          backgroundColor: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon style={{ width: "20px", height: "20px", color: iconColor }} />
      </div>
      <span style={{ fontSize: "0.813rem", color: "#737373", fontWeight: 500 }}>
        {label}
      </span>
    </div>
    <div style={{ fontSize: "1.125rem", fontWeight: 700, color: valueColor || "#262626" }}>
      {value}
    </div>
  </div>
);

const SubscriptionDetail = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  const endDate = new Date(record.stripeCurrentPeriodEnd).getTime() + 86400000;
  const now = Date.now();
  const daysRemaining = Math.ceil((endDate - now) / 86400000);
  const isActive = record.stripeCurrentPeriodEnd && endDate > now;

  return (
    <div style={{ padding: "24px", maxWidth: "1200px" }}>
      {/* Header Card */}
      <div
        style={{
          background: isActive
            ? "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)"
            : "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px",
          border: isActive ? "2px solid #86efac" : "2px solid #fca5a5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#262626", margin: 0 }}>
                {record.username}
              </h1>
              <span
                style={{
                  padding: "6px 16px",
                  borderRadius: "20px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  backgroundColor: isActive ? "#059669" : "#dc2626",
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {isActive ? (
                  <>
                    <CheckCircle style={{ width: "16px", height: "16px" }} />
                    Active
                  </>
                ) : (
                  <>
                    <XCircle style={{ width: "16px", height: "16px" }} />
                    Expired
                  </>
                )}
              </span>
            </div>
            <p style={{ fontSize: "1.125rem", color: "#525252", margin: "0 0 8px 0", fontWeight: 500 }}>
              {record.email}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#737373", margin: 0, fontFamily: "monospace" }}>
              User ID: {record.userId}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.875rem", color: "#737373", marginBottom: "4px" }}>
              Subscription ID
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#262626" }}>
              #{record.id}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <InfoCard
          icon={Calendar}
          label="Current Period End"
          value={new Date(record.stripeCurrentPeriodEnd).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          iconColor="#8b5cf6"
          iconBg="#f3e8ff"
        />
        <InfoCard
          icon={Clock}
          label="Days Remaining"
          value={daysRemaining > 0 ? `${daysRemaining} days` : "Expired"}
          valueColor={daysRemaining > 0 ? "#059669" : "#dc2626"}
          iconColor="#f59e0b"
          iconBg="#fef3c7"
        />
        <InfoCard
          icon={TrendingUp}
          label="Status"
          value={isActive ? "Active Subscription" : "Expired"}
          valueColor={isActive ? "#059669" : "#dc2626"}
          iconColor={isActive ? "#059669" : "#dc2626"}
          iconBg={isActive ? "#d1fae5" : "#fee2e2"}
        />
      </div>

      {/* Stripe Details Section */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
          padding: "28px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#262626",
            marginTop: 0,
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <CreditCard style={{ width: "24px", height: "24px", color: "#635bff" }} />
          Stripe Details
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <div style={{ fontSize: "0.813rem", color: "#737373", marginBottom: "6px", fontWeight: 500 }}>
              Subscription ID
            </div>
            <div
              style={{
                fontSize: "0.938rem",
                fontWeight: 600,
                color: "#262626",
                fontFamily: "monospace",
                backgroundColor: "#f5f5f5",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #e5e5e5",
              }}
            >
              {record.stripeSubscriptionId}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.813rem", color: "#737373", marginBottom: "6px", fontWeight: 500 }}>
              Customer ID
            </div>
            <div
              style={{
                fontSize: "0.938rem",
                fontWeight: 600,
                color: "#262626",
                fontFamily: "monospace",
                backgroundColor: "#f5f5f5",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #e5e5e5",
              }}
            >
              {record.stripeCustomerId}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.813rem", color: "#737373", marginBottom: "6px", fontWeight: 500 }}>
              Price ID
            </div>
            <div
              style={{
                fontSize: "0.938rem",
                fontWeight: 600,
                color: "#262626",
                fontFamily: "monospace",
                backgroundColor: "#f5f5f5",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #e5e5e5",
              }}
            >
              {record.stripePriceId}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
          padding: "28px",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#262626",
            marginTop: 0,
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Clock style={{ width: "24px", height: "24px", color: "#0ea5e9" }} />
          Timeline
        </h2>

        <div style={{ position: "relative", paddingLeft: "32px" }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: "11px",
              top: "8px",
              bottom: "8px",
              width: "2px",
              backgroundColor: "#e5e5e5",
            }}
          />

          {/* Timeline items */}
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "-32px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "#059669",
                border: "3px solid #d1fae5",
              }}
            />
            <div style={{ fontSize: "0.875rem", color: "#737373", marginBottom: "4px" }}>
              Subscription Created
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "#262626" }}>
              Active since subscription start
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "-32px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: isActive ? "#0ea5e9" : "#dc2626",
                border: `3px solid ${isActive ? "#e0f2fe" : "#fee2e2"}`,
              }}
            />
            <div style={{ fontSize: "0.875rem", color: "#737373", marginBottom: "4px" }}>
              {isActive ? "Renews On" : "Expired On"}
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "#262626" }}>
              {new Date(record.stripeCurrentPeriodEnd).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SubscriptionShow = () => (
  <Show>
    <SubscriptionDetail />
  </Show>
);

