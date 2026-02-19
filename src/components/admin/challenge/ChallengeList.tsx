import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  NumberField,
  SelectField,
  ChipField,
} from "react-admin";
import { CustomPagination } from "../CustomPagination";

const ChallengeList = () => (
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
      <NumberField
        source="order"
        label="Order"
        sx={{
          fontWeight: 600,
          color: "#059669",
        }}
      />
      <TextField
        source="question"
        label="Question"
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color: "#404040",
          maxWidth: "300px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />

      <ChipField
        source="type"
        label="Type"
        sx={{
          "& .MuiChip-root": {
            backgroundColor: "#f0fdf4",
            color: "#059669",
            border: "2px solid #a7f3d0",
            fontWeight: 600,
          },
        }}
      />

      <ReferenceField source="lessonId" reference="lessons" label="Lesson" />
    </Datagrid>
  </List>
);

export default ChallengeList;
