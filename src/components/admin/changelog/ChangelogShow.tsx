"use client";

import {
  Show,
  useRecordContext,
} from "react-admin";
import { Plus, Edit, Trash2, BookOpen, Grid3x3, GraduationCap, HelpCircle, List as ListIcon, CreditCard, Settings, User, Clock, FileText } from "lucide-react";

const ChangelogDetail = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  const actionConfig: Record<string, { label: string; Icon: any; color: string; bg: string; gradient: string }> = {
    "created": { 
      label: "Created", 
      Icon: Plus, 
      color: "#059669",
      bg: "#d1fae5",
      gradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
    },
    "updated": { 
      label: "Updated", 
      Icon: Edit, 
      color: "#0ea5e9",
      bg: "#e0f2fe",
      gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
    },
    "deleted": { 
      label: "Deleted", 
      Icon: Trash2, 
      color: "#dc2626",
      bg: "#fee2e2",
      gradient: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)"
    },
  };

  const resourceConfig: Record<string, { Icon: any; color: string; bg: string; label: string }> = {
    "courses": { Icon: BookOpen, color: "#059669", bg: "#d1fae5", label: "Courses" },
    "units": { Icon: Grid3x3, color: "#0ea5e9", bg: "#e0f2fe", label: "Units" },
    "lessons": { Icon: GraduationCap, color: "#8b5cf6", bg: "#f3e8ff", label: "Lessons" },
    "challenges": { Icon: HelpCircle, color: "#f59e0b", bg: "#fef3c7", label: "Challenges" },
    "challengeOptions": { Icon: ListIcon, color: "#ec4899", bg: "#fce7f3", label: "Challenge Options" },
    "userSubscription": { Icon: CreditCard, color: "#635bff", bg: "#635bff15", label: "Subscriptions" },
    "settings": { Icon: Settings, color: "#737373", bg: "#f5f5f5", label: "Settings" },
  };

  const actionData = actionConfig[record.action] || actionConfig.updated;
  const resourceData = resourceConfig[record.resourceType] || { 
    Icon: FileText, 
    color: "#737373", 
    bg: "#f5f5f5",
    label: record.resourceType 
  };

  const ActionIcon = actionData.Icon;
  const ResourceIcon = resourceData.Icon;

  let parsedChanges = null;
  try {
    if (record.changes) {
      parsedChanges = JSON.parse(record.changes);
    }
  } catch (e) {
    // Invalid JSON, ignore
  }

  return (
    <div style={{ padding: "24px", maxWidth: "1000px" }}>
      {/* Header Card */}
      <div
        style={{
          background: actionData.gradient,
          border: `2px solid ${actionData.color}40`,
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `2px solid ${actionData.color}`,
                }}
              >
                <ActionIcon style={{ width: "24px", height: "24px", color: actionData.color }} />
              </div>
              <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#262626", margin: 0 }}>
                {actionData.label}
              </h1>
            </div>
            <p style={{ fontSize: "1.125rem", color: "#525252", margin: 0, fontWeight: 500 }}>
              {record.resourceName || `${resourceData.label} #${record.resourceId}`}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.875rem", color: "#737373", marginBottom: "4px" }}>
              Entry ID
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#262626" }}>
              #{record.id}
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Resource Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e5e5e5",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: resourceData.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${resourceData.color}40`,
              }}
            >
              <ResourceIcon style={{ width: "20px", height: "20px", color: resourceData.color }} />
            </div>
            <span style={{ fontSize: "0.813rem", color: "#737373", fontWeight: 500 }}>
              Resource Type
            </span>
          </div>
          <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "#262626" }}>
            {resourceData.label}
          </div>
          <div style={{ fontSize: "0.813rem", color: "#a3a3a3", marginTop: "4px", fontFamily: "monospace" }}>
            ID: {record.resourceId}
          </div>
        </div>

        {/* Time Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e5e5e5",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#f3e8ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #c4b5fd",
              }}
            >
              <Clock style={{ width: "20px", height: "20px", color: "#8b5cf6" }} />
            </div>
            <span style={{ fontSize: "0.813rem", color: "#737373", fontWeight: 500 }}>
              Timestamp
            </span>
          </div>
          <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "#262626" }}>
            {new Date(record.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div style={{ fontSize: "0.875rem", color: "#737373", marginTop: "4px" }}>
            {new Date(record.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>
      </div>

      {/* Admin User Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#262626",
            marginTop: 0,
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <User style={{ width: "24px", height: "24px", color: "#059669" }} />
          Admin User
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#f9fafb",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #e5e5e5",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#d1fae5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #a7f3d0",
            }}
          >
            <User style={{ width: "24px", height: "24px", color: "#059669" }} />
          </div>
          <div>
            <div style={{ fontSize: "0.875rem", color: "#737373", marginBottom: "4px" }}>
              User ID
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "#262626", fontFamily: "monospace" }}>
              {record.userId}
            </div>
          </div>
        </div>
      </div>

      {/* Changes Card */}
      {parsedChanges && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e5e5e5",
            padding: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#262626",
              marginTop: 0,
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <FileText style={{ width: "24px", height: "24px", color: "#0ea5e9" }} />
            Changes Made
          </h2>
          <pre
            style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "0.875rem",
              fontFamily: "monospace",
              color: "#404040",
              overflow: "auto",
              margin: 0,
              lineHeight: "1.6",
            }}
          >
            {JSON.stringify(parsedChanges, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export const ChangelogShow = () => (
  <Show>
    <ChangelogDetail />
  </Show>
);

