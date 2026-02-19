import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  NumberField,
} from "react-admin";
import { CustomPagination } from "../CustomPagination";

const LessonList = () => (
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
        label="Lesson Title"
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color: "#404040",
        }}
      />
      <ReferenceField source="unitId" reference="units" label="Unit" />
    </Datagrid>
  </List>
);

export default LessonList;
