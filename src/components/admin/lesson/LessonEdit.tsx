import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
} from "react-admin";

const LessonEdit = () => (
  <Edit>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": {
          marginBottom: "24px",
        },
      }}
    >
      <NumberInput source="id" label="Lesson ID" disabled fullWidth />
      <NumberInput
        source="order"
        label="Order"
        validate={[required()]}
        fullWidth
        helperText="The display order within the unit"
      />
      <TextInput
        source="title"
        label="Lesson Title"
        validate={[required()]}
        fullWidth
        helperText="The title of this lesson"
      />
      <ReferenceInput
        source="unitId"
        reference="units"
        label="Unit"
        fullWidth
      />
    </SimpleForm>
  </Edit>
);

export default LessonEdit;
