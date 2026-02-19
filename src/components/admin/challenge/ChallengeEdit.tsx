import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  NumberInput,
  required,
  SelectInput,
} from "react-admin";

const ChallengeEdit = () => (
  <Edit>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": {
          marginBottom: "24px",
        },
      }}
    >
      <NumberInput source="id" label="Challenge ID" disabled fullWidth />
      <NumberInput
        source="order"
        label="Order"
        validate={[required()]}
        fullWidth
        helperText="The display order within the lesson"
      />
      <TextInput
        source="question"
        label="Question"
        validate={[required()]}
        fullWidth
        helperText="The question or prompt for this challenge"
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
  </Edit>
);

export default ChallengeEdit;
