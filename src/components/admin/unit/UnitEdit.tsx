import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
} from "react-admin";

const UnitEdit = () => (
  <Edit>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": {
          marginBottom: "24px",
        },
      }}
    >
      <NumberInput source="id" label="Unit ID" disabled fullWidth />
      <NumberInput
        source="order"
        label="Order"
        validate={[required()]}
        fullWidth
        helperText="The display order of this unit"
      />
      <TextInput
        source="title"
        label="Unit Title"
        validate={[required()]}
        fullWidth
        helperText="The title of this learning unit"
      />

      <TextInput
        source="description"
        label="Description"
        validate={[required()]}
        fullWidth
        multiline
        rows={3}
        helperText="Description of what students will learn"
      />

      <ReferenceInput
        source="courseId"
        reference="courses"
        label="Course"
        fullWidth
      />
    </SimpleForm>
  </Edit>
);

export default UnitEdit;
