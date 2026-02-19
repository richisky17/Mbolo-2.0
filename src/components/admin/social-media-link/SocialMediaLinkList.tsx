import {
  Datagrid,
  List,
  TextField,
  NumberField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { CustomPagination } from "../CustomPagination";

const SocialMediaLinkList = () => (
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
        source="platform"
        label="Platform"
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color: "#404040",
          textTransform: "capitalize",
        }}
      />
      <TextField
        source="url"
        label="URL"
        sx={{
          fontFamily: "monospace",
          fontSize: "0.875rem",
          color: "#737373",
        }}
      />
      <NumberField source="order" label="Order" />
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

export default SocialMediaLinkList;

