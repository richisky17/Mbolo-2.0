import { Datagrid, List, TextField, ImageField } from "react-admin";
import { CustomPagination } from "../CustomPagination";

const CourseList = () => (
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
      <ImageField
        source="imageSrc"
        label="Flag"
        sx={{
          "& img": {
            width: "60px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "2px solid #e5e5e5",
            pointerEvents: "none",
          },
        }}
      />
      <TextField
        source="title"
        label="Course Title"
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color: "#404040",
        }}
      />
    </Datagrid>
  </List>
);

export default CourseList;
