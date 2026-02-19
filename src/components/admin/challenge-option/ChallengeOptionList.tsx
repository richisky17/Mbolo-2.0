import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  NumberField,
  BooleanField,
  ImageField,
} from "react-admin";
import { CustomPagination } from "../CustomPagination";

const ChallengeOptionList = () => (
  <List pagination={<CustomPagination />}>
    <Datagrid
      rowClick="edit"
      sx={{
        "& .RaDatagrid-rowCell": {
          verticalAlign: "middle",
        },
      }}
    >
      <NumberField source="id" label="ID" />
      <TextField
        source="text"
        label="Option Text"
        sx={{
          fontWeight: 600,
          fontSize: "1rem",
          color: "#404040",
        }}
      />
      <BooleanField
        source="correct"
        label="Correct Answer"
        sx={{
          "& .MuiSvgIcon-root": {
            color: "#059669",
          },
        }}
      />
      <ImageField
        source="imageSrc"
        label="Image"
        sx={{
          "& img": {
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "2px solid #e5e5e5",
            pointerEvents: "none",
          },
        }}
      />
      <TextField
        source="audioSrc"
        label="Audio"
        sx={{
          color: "#737373",
          fontSize: "0.875rem",
          maxWidth: "150px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <ReferenceField
        source="challengeId"
        reference="challenges"
        label="Challenge"
      />
    </Datagrid>
  </List>
);

export default ChallengeOptionList;
