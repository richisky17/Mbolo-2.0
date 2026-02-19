"use client";

import { Menu, useSidebarState } from "react-admin";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const AdminMenu = () => {
  const [open] = useSidebarState();

  return (
    <div>
      <div style={{ 
        padding: "20px 12px", 
        marginBottom: "8px",
      }}>
        <Link
          href="/learn"
          className="admin-back-button"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px 14px",
            backgroundColor: "white",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            color: "#404040",
            fontWeight: 600,
            fontSize: "0.875rem",
            transition: "all 0.2s ease",
            width: "100%",
            maxWidth: "100%",
          }}
          title={!open ? "Back to App" : undefined}
        >
          <ArrowLeft size={18} style={{ flexShrink: 0 }} />
          {open && <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>Back to App</span>}
        </Link>
      </div>
      <Menu />
    </div>
  );
};

