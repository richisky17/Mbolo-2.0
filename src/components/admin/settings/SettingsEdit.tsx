"use client";

import { Edit, SimpleForm, TextInput, useRecordContext } from "react-admin";
import { Key, Lock, DollarSign, Banknote, Calendar, Settings as SettingsIcon } from "lucide-react";

const SettingHeader = () => {
  const record = useRecordContext();
  if (!record) return null;

  const settingConfig: Record<string, { name: string; Icon: any; color: string; bg: string; description: string }> = {
    "stripe_api_key": { 
      name: "Stripe API Key", 
      Icon: Key, 
      color: "#635bff",
      bg: "#635bff15",
      description: "Your Stripe secret API key for processing payments"
    },
    "stripe_webhook_secret": { 
      name: "Stripe Webhook Secret", 
      Icon: Lock, 
      color: "#059669",
      bg: "#d1fae5",
      description: "Webhook signing secret for verifying Stripe events"
    },
    "subscription_price": { 
      name: "Subscription Price", 
      Icon: DollarSign, 
      color: "#f59e0b",
      bg: "#fef3c7",
      description: "Monthly subscription price in dollars (e.g., 20 or 29.99)"
    },
    "subscription_currency": { 
      name: "Currency", 
      Icon: Banknote, 
      color: "#0ea5e9",
      bg: "#e0f2fe",
      description: "Currency code for subscriptions (e.g., USD, EUR, GBP)"
    },
    "subscription_interval": { 
      name: "Billing Interval", 
      Icon: Calendar, 
      color: "#8b5cf6",
      bg: "#f3e8ff",
      description: "Billing cycle (month or year)"
    },
  };

  const config = settingConfig[record.key] || { 
    name: record.key, 
    Icon: SettingsIcon,
    color: "#737373",
    bg: "#f5f5f5",
    description: "Custom setting"
  };

  const Icon = config.Icon;

  return (
    <div
      style={{
        backgroundColor: config.bg,
        border: `2px solid ${config.color}30`,
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${config.color}40`,
          }}
        >
          <Icon style={{ width: "28px", height: "28px", color: config.color }} />
        </div>
        <div>
          <h2 style={{ margin: "0 0 4px 0", fontSize: "1.5rem", fontWeight: 800, color: "#262626" }}>
            {config.name}
          </h2>
          <p style={{ margin: 0, color: "#737373", fontSize: "0.938rem" }}>
            {config.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const SettingsEdit = () => (
  <Edit>
    <SettingHeader />
    <SimpleForm
      sx={{
        "& .MuiTextField-root": {
          marginBottom: "20px",
        },
        "& .MuiFormControl-root": {
          marginBottom: "20px",
        },
      }}
    >
      <TextInput
        source="id"
        label="Setting ID"
        disabled
        fullWidth
      />
      
      <TextInput
        source="key"
        label="Setting Key"
        fullWidth
        helperText="The unique identifier for this setting (cannot be changed)"
        disabled
        sx={{
          "& .MuiInputBase-input": {
            fontFamily: "monospace",
            fontSize: "0.875rem",
            backgroundColor: "#f5f5f5",
          },
        }}
      />
      
      <TextInput
        source="value"
        label="Value"
        fullWidth
        helperText="Update the value for this setting. Changes take effect immediately."
        placeholder="Enter the new value"
        isRequired
        multiline
        rows={5}
        sx={{
          "& .MuiInputBase-input": {
            fontFamily: "monospace",
            fontSize: "0.938rem",
            lineHeight: "1.6",
          },
        }}
      />
    </SimpleForm>
  </Edit>
);

