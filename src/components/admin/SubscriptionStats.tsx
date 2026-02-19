"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp, XCircle, DollarSign } from "lucide-react";

interface Stats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  expiredSubscriptions: number;
  mrr: number;
}

export const SubscriptionStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/subscription-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              padding: "20px",
              height: "120px",
            }}
          >
            <div style={{ color: "#a3a3a3" }}>Loading...</div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statCards = [
    {
      title: "Total Subscriptions",
      value: stats.totalSubscriptions,
      icon: Users,
      color: "#635bff",
      bgColor: "#635bff15",
    },
    {
      title: "Active",
      value: stats.activeSubscriptions,
      icon: TrendingUp,
      color: "#059669",
      bgColor: "#d1fae5",
    },
    {
      title: "Expired",
      value: stats.expiredSubscriptions,
      icon: XCircle,
      color: "#dc2626",
      bgColor: "#fee2e2",
    },
    {
      title: "MRR",
      value: `$${stats.mrr}`,
      icon: DollarSign,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              padding: "20px",
              transition: "all 0.2s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 8px 16px -4px ${stat.color}20`;
              e.currentTarget.style.borderColor = stat.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#e5e5e5";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#737373",
                  fontWeight: 500,
                }}
              >
                {stat.title}
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: stat.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon style={{ color: stat.color, width: "20px", height: "20px" }} />
              </div>
            </div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: "#262626",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

