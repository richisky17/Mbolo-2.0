"use client";

import {
  Datagrid,
  List,
  TextField,
  DateField,
  FunctionField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { CustomPagination } from "../CustomPagination";
import { Key, Lock, DollarSign, Banknote, Calendar, Settings as SettingsIcon } from "lucide-react";

export const SettingsList = () => (
  <List
    pagination={<CustomPagination />}
    perPage={25}
    sort={{ field: "key", order: "ASC" }}
  >
    <Datagrid
      rowClick="edit"
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
        label="Setting"
        render={(record: any) => {
          const settingConfig: Record<string, { name: string; Icon: any; color: string; bg: string }> = {
            "stripe_api_key": { 
              name: "Stripe API Key", 
              Icon: Key, 
              color: "#635bff",
              bg: "#635bff15"
            },
            "stripe_webhook_secret": { 
              name: "Stripe Webhook Secret", 
              Icon: Lock, 
              color: "#059669",
              bg: "#d1fae5"
            },
            "subscription_price": { 
              name: "Subscription Price", 
              Icon: DollarSign, 
              color: "#f59e0b",
              bg: "#fef3c7"
            },
            "subscription_currency": { 
              name: "Currency", 
              Icon: Banknote, 
              color: "#0ea5e9",
              bg: "#e0f2fe"
            },
            "subscription_interval": { 
              name: "Billing Interval", 
              Icon: Calendar, 
              color: "#8b5cf6",
              bg: "#f3e8ff"
            },
          };
          
          const config = settingConfig[record.key] || { 
            name: record.key, 
            Icon: SettingsIcon,
            color: "#737373",
            bg: "#f5f5f5"
          };
          
          const Icon = config.Icon;
          
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: config.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${config.color}30`,
                }}
              >
                <Icon style={{ width: "20px", height: "20px", color: config.color }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#262626", fontSize: "0.938rem" }}>
                  {config.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#a3a3a3", fontFamily: "monospace" }}>
                  {record.key}
                </div>
              </div>
            </div>
          );
        }}
      />
      <FunctionField
        label="Value"
        render={(record: any) => {
          // Mask sensitive values
          if (record.key === "stripe_api_key" || record.key === "stripe_webhook_secret") {
            if (!record.value) {
              return (
                <span 
                  style={{ 
                    color: "#dc2626", 
                    fontWeight: 600,
                    backgroundColor: "#fee2e2",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "0.813rem"
                  }}
                >
                  Not set
                </span>
              );
            }
            return (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ 
                  fontFamily: "monospace", 
                  color: "#404040", 
                  fontSize: "0.875rem",
                  backgroundColor: "#f5f5f5",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5"
                }}>
                  {record.value.substring(0, 12)}...
                </span>
                <Lock style={{ width: "14px", height: "14px", color: "#737373" }} />
              </div>
            );
          }
          
          // Format price
          if (record.key === "subscription_price") {
            return (
              <span style={{ 
                fontWeight: 700, 
                color: "#059669", 
                fontSize: "1.125rem",
                backgroundColor: "#d1fae5",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #a7f3d0"
              }}>
                ${record.value}
              </span>
            );
          }
          
          // Format currency
          if (record.key === "subscription_currency") {
            return (
              <span style={{ 
                fontWeight: 600, 
                color: "#0ea5e9",
                fontSize: "0.938rem",
                backgroundColor: "#e0f2fe",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #7dd3fc"
              }}>
                {record.value}
              </span>
            );
          }
          
          // Format interval
          if (record.key === "subscription_interval") {
            return (
              <span style={{ 
                fontWeight: 600, 
                color: "#8b5cf6",
                fontSize: "0.938rem",
                backgroundColor: "#f3e8ff",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #c4b5fd",
                textTransform: "capitalize"
              }}>
                {record.value}
              </span>
            );
          }
          
          return (
            <span style={{ fontWeight: 500, color: "#404040" }}>
              {record.value || <span style={{ color: "#dc2626" }}>Not set</span>}
            </span>
          );
        }}
      />
      <DateField
        source="updatedAt"
        label="Last Updated"
        showTime
        sx={{
          fontSize: "0.813rem",
          color: "#737373",
        }}
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

