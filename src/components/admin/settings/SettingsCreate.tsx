"use client";

import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";

const settingChoices = [
  { id: "stripe_api_key", name: "Stripe API Key" },
  { id: "stripe_webhook_secret", name: "Stripe Webhook Secret" },
  { id: "subscription_price", name: "Subscription Price" },
  { id: "subscription_currency", name: "Currency" },
  { id: "subscription_interval", name: "Billing Interval" },
];

export const SettingsCreate = () => (
  <Create>
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
      <SelectInput
        source="key"
        label="Setting Name"
        choices={settingChoices}
        fullWidth
        helperText="Choose the setting you want to configure"
        isRequired
      />
      
      <TextInput
        source="value"
        label="Value"
        fullWidth
        helperText="Enter the value for this setting (e.g., sk_test_... for API keys, 20 for price, USD for currency, month for interval)"
        placeholder="Enter value..."
        isRequired
        multiline
        rows={4}
      />
    </SimpleForm>
  </Create>
);

