"use client";

import {
  Datagrid,
  List,
  TextField,
  DateField,
  FunctionField,
} from "react-admin";
import { CustomPagination } from "../CustomPagination";
import { Plus, Edit, Trash2, BookOpen, Grid3x3, GraduationCap, HelpCircle, List as ListIcon, CreditCard, Settings, User } from "lucide-react";

export const ChangelogList = () => (
  <List
    pagination={<CustomPagination />}
    perPage={25}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <Datagrid
      bulkActionButtons={false}
      rowClick="show"
      sx={{
        "& .RaDatagrid-rowCell": {
          verticalAlign: "middle",
        },
      }}
    >
      <TextField
        source="id"
        label="ID"
        sx={{
          color: "#737373",
          fontSize: "0.875rem",
        }}
      />
      
      <FunctionField
        label="Action"
        render={(record: any) => {
          const actionConfig: Record<string, { label: string; Icon: any; color: string; bg: string }> = {
            "created": { 
              label: "Created", 
              Icon: Plus, 
              color: "#059669",
              bg: "#d1fae5"
            },
            "updated": { 
              label: "Updated", 
              Icon: Edit, 
              color: "#0ea5e9",
              bg: "#e0f2fe"
            },
            "deleted": { 
              label: "Deleted", 
              Icon: Trash2, 
              color: "#dc2626",
              bg: "#fee2e2"
            },
          };
          
          const config = actionConfig[record.action] || { 
            label: record.action, 
            Icon: Edit,
            color: "#737373",
            bg: "#f5f5f5"
          };
          
          const Icon = config.Icon;
          
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: config.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${config.color}40`,
                }}
              >
                <Icon style={{ width: "16px", height: "16px", color: config.color }} />
              </div>
              <span
                style={{
                  fontWeight: 600,
                  color: config.color,
                  textTransform: "capitalize",
                }}
              >
                {config.label}
              </span>
            </div>
          );
        }}
      />

      <FunctionField
        label="Resource"
        render={(record: any) => {
          const resourceConfig: Record<string, { Icon: any; color: string; bg: string }> = {
            "courses": { Icon: BookOpen, color: "#059669", bg: "#d1fae5" },
            "units": { Icon: Grid3x3, color: "#0ea5e9", bg: "#e0f2fe" },
            "lessons": { Icon: GraduationCap, color: "#8b5cf6", bg: "#f3e8ff" },
            "challenges": { Icon: HelpCircle, color: "#f59e0b", bg: "#fef3c7" },
            "challengeOptions": { Icon: ListIcon, color: "#ec4899", bg: "#fce7f3" },
            "userSubscription": { Icon: CreditCard, color: "#635bff", bg: "#635bff15" },
            "settings": { Icon: Settings, color: "#737373", bg: "#f5f5f5" },
          };
          
          const config = resourceConfig[record.resourceType] || { 
            Icon: User,
            color: "#737373",
            bg: "#f5f5f5"
          };
          
          const Icon = config.Icon;
          
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: config.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${config.color}30`,
                }}
              >
                <Icon style={{ width: "18px", height: "18px", color: config.color }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#262626", fontSize: "0.938rem" }}>
                  {record.resourceName || `${record.resourceType} #${record.resourceId}`}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#a3a3a3" }}>
                  {record.resourceType} • ID: {record.resourceId}
                </div>
              </div>
            </div>
          );
        }}
      />

      <FunctionField
        label="Admin User"
        render={(record: any) => (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0fdf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #bbf7d0",
              }}
            >
              <User style={{ width: "16px", height: "16px", color: "#059669" }} />
            </div>
            <span style={{ fontSize: "0.875rem", color: "#737373", fontFamily: "monospace" }}>
              {record.userId.substring(0, 12)}...
            </span>
          </div>
        )}
      />

      <DateField
        source="createdAt"
        label="Date & Time"
        showTime
        sx={{
          fontSize: "0.875rem",
          color: "#404040",
          fontWeight: 500,
        }}
      />
    </Datagrid>
  </List>
);

