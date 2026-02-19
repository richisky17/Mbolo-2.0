import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
} from "react-admin";

const UnitCreate = () => (
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
        helperText="The display order of this unit (lower numbers appear first)"
        defaultValue={1}
      />
      <TextInput
        source="title"
        label="Unit Title"
        validate={[required()]}
        fullWidth
        helperText="Enter a descriptive title for this learning unit"
        placeholder="e.g., Unit 1: Basics"
      />

      <TextInput
        source="description"
        label="Description"
        validate={[required()]}
        fullWidth
        multiline
        rows={3}
        helperText="Provide a brief description of what students will learn"
        placeholder="Learn the fundamentals of..."
      />

      <ReferenceInput
        source="courseId"
        reference="courses"
        label="Course"
        fullWidth
      />
    </SimpleForm>
  </Create>
);

export default UnitCreate;
