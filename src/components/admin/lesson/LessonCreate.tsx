import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
} from "react-admin";

const LessonCreate = () => (
  <Create>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": {
          marginBottom: "24px",
        },
      }}
    >
      <NumberInput
        source="order"
        label="Order"
        validate={[required()]}
        fullWidth
        helperText="The display order within the unit (lower numbers appear first)"
        defaultValue={1}
      />
      <TextInput
        source="title"
        label="Lesson Title"
        validate={[required()]}
        fullWidth
        helperText="Enter a descriptive title for this lesson"
        placeholder="e.g., Lesson 1: Greetings"
      />
      <ReferenceInput
        source="unitId"
        reference="units"
        label="Unit"
        fullWidth
      />
    </SimpleForm>
  </Create>
);

export default LessonCreate;
