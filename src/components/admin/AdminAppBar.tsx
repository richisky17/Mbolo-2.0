"use client";

import { AppBar } from "react-admin";
import Link from "next/link";

export const AdminAppBar = () => (
  <AppBar
    sx={{
      backgroundColor: "white !important",
      borderBottom: "1px solid #e5e5e5",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05) !important",
      color: "#404040",
      "& .RaAppBar-toolbar": {
        padding: "0 24px",
        minHeight: "64px",
        display: "flex",
        alignItems: "center",
      },
    }}
  >
    {/* Logo and Badge */}
    <Link
      href="/admin"
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span
        style={{
          fontSize: "26px",
          fontWeight: 800,
          background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
        }}
      >
        Mbolo
      </span>
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#737373",
          backgroundColor: "#f0fdf4",
          padding: "5px 10px",
          borderRadius: "6px",
          border: "1px solid #a7f3d0",
          letterSpacing: "0.02em",
        }}
      >
        Admin Panel
      </span>
    </Link>
  </AppBar>
);

