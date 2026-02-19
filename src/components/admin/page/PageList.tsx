import {
  Datagrid,
  List,
  TextField,
  DateField,
  ChipField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { CustomPagination } from "../CustomPagination";

const PageList = () => (
  <List pagination={<CustomPagination />}>
    <Datagrid
      rowClick="edit"
      sx={{
        "& .RaDatagrid-rowCell": {
          verticalAlign: "middle",
        },
      }}
    >
      <TextField source="id" label="ID" />
      <TextField
        source="title"
        label="Page Title"
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color: "#404040",
        }}
      />
      <TextField
        source="slug"
        label="Slug"
        sx={{
          fontFamily: "monospace",
          fontSize: "0.875rem",
          color: "#737373",
        }}
      />
      <TextField
        source="language"
        label="Language"
        sx={{
          fontWeight: 500,
          fontSize: "0.875rem",
          color: "#404040",
        }}
      />
      <ChipField
        source="status"
        label="Status"
        sx={{
          "& .MuiChip-root": {
            backgroundColor: (record: any) =>
              record.status === "published" ? "#dcfce7" : "#fef3c7",
            color: (record: any) =>
              record.status === "published" ? "#166534" : "#92400e",
            border: (record: any) =>
              record.status === "published"
                ? "1px solid #86efac"
                : "1px solid #fde047",
            fontWeight: 600,
            fontSize: "0.75rem",
          },
        }}
      />
      <DateField
        source="updatedAt"
        label="Last Updated"
        showTime
        sx={{
          fontSize: "0.875rem",
          color: "#737373",
        }}
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default PageList;

