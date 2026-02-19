import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  NumberField,
} from "react-admin";
import { CustomPagination } from "../CustomPagination";

const UnitList = () => (
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
        source="title"
        label="Unit Title"
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color: "#404040",
        }}
      />
      <TextField
        source="description"
        label="Description"
        sx={{
          color: "#737373",
          maxWidth: "300px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <ReferenceField source="courseId" reference="courses" label="Course" />
    </Datagrid>
  </List>
);

export default UnitList;
