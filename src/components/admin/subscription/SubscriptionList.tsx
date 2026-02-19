"use client";

import {
  Datagrid,
  List,
  TextField,
  DateField,
  BooleanField,
  FunctionField,
} from "react-admin";
import { CustomPagination } from "../CustomPagination";

export const SubscriptionList = () => (
  <List
    pagination={<CustomPagination />}
    perPage={25}
    sort={{ field: "id", order: "DESC" }}
  >
    <Datagrid
      bulkActionButtons={false}
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
        label="User"
        render={(record: any) => (
          <div>
            <div
              style={{
                fontWeight: 700,
                color: "#262626",
                fontSize: "0.938rem",
                marginBottom: "2px",
              }}
            >
              {record.username}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#737373",
              }}
            >
              {record.email}
            </div>
          </div>
        )}
      />
      <TextField
        source="stripeCustomerId"
        label="Customer ID"
        sx={{
          fontFamily: "monospace",
          fontSize: "0.875rem",
          color: "#737373",
        }}
      />
      <FunctionField
        label="Status"
        render={(record: any) => {
          const isActive =
            record.stripeCurrentPeriodEnd &&
            new Date(record.stripeCurrentPeriodEnd).getTime() + 86400000 >
              Date.now();
          return (
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: isActive ? "#dcfce7" : "#fee2e2",
                color: isActive ? "#047857" : "#991b1b",
                border: `1px solid ${isActive ? "#bbf7d0" : "#fecaca"}`,
              }}
            >
              {isActive ? "Active" : "Expired"}
            </span>
          );
        }}
      />
      <DateField
        source="stripeCurrentPeriodEnd"
        label="Period End"
        showTime
        sx={{
          fontSize: "0.875rem",
          color: "#404040",
        }}
      />
      <TextField
        source="stripePriceId"
        label="Price ID"
        sx={{
          fontFamily: "monospace",
          fontSize: "0.75rem",
          color: "#737373",
        }}
      />
    </Datagrid>
  </List>
);

