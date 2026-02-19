import { List, Datagrid, TextField, NumberField, BooleanField, FunctionField, EditButton, DeleteButton, CreateButton, ExportButton, TopToolbar } from "react-admin";
import { Chip } from "@mui/material";
import { Mic } from "lucide-react";
import { CustomPagination } from "../CustomPagination";

const DifficultyChip = ({ record }: any) => {
  const getColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={record?.difficulty || "beginner"}
      color={getColor(record?.difficulty)}
      size="small"
    />
  );
};

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const PronunciationTextList = () => {
  return (
    <List
      actions={<ListActions />}
      title="Pronunciation Practice Texts"
      pagination={<CustomPagination />}
    >
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="courseId" label="Course ID" />
        <TextField
          source="text"
          label="Practice Text"
          sx={{
            maxWidth: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        />
        <FunctionField
          label="Difficulty"
          render={(record: any) => <DifficultyChip record={record} />}
        />
        <TextField source="category" label="Category" />
        <BooleanField source="aiGenerated" label="AI Generated" />
        <NumberField source="order" label="Order" />
        <TextField source="createdAt" label="Created" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default PronunciationTextList;

