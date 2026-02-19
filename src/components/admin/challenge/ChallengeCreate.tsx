import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
  SelectInput,
} from "react-admin";

const ChallengeCreate = () => (
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
        helperText="The display order within the lesson (lower numbers appear first)"
        defaultValue={1}
      />
      <TextInput
        source="question"
        label="Question"
        validate={[required()]}
        fullWidth
        helperText="Enter the question or prompt for this challenge"
        placeholder="e.g., What is this?"
      />

      <SelectInput
        source="type"
        label="Challenge Type"
        choices={[
          {
            id: "SELECT",
            name: "Multiple Choice",
          },
          {
            id: "ASSIST",
            name: "Word Bank",
          },
        ]}
        validate={[required()]}
        fullWidth
        helperText="SELECT: Choose from options | ASSIST: Word bank with help"
      />

      <ReferenceInput
        source="lessonId"
        reference="lessons"
        label="Lesson"
        fullWidth
      />
    </SimpleForm>
  </Create>
);

export default ChallengeCreate;
