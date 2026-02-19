import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  required,
  BooleanInput,
  NumberInput,
} from "react-admin";

const ChallengeOptionEdit = () => (
  <Edit>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": {
          marginBottom: "24px",
        },
        "& .MuiFormControlLabel-root": {
          marginBottom: "24px",
        },
      }}
    >
      <NumberInput source="id" label="Option ID" disabled fullWidth />
      <TextInput
        source="text"
        label="Option Text"
        validate={[required()]}
        fullWidth
        helperText="The text content of this answer choice"
      />
      <BooleanInput
        source="correct"
        label="Correct Answer"
        helperText="Mark this option as the correct answer"
      />
      <TextInput
        source="imageSrc"
        label="Image Path"
        fullWidth
        helperText="Optional: Path to an image for this option"
        placeholder="/boy.svg"
      />
      <TextInput
        source="audioSrc"
        label="Audio Path"
        fullWidth
        helperText="Optional: Path to audio pronunciation"
        placeholder="/es_boy.mp3"
      />
      <ReferenceInput
        source="challengeId"
        reference="challenges"
        label="Challenge"
        fullWidth
      />
    </SimpleForm>
  </Edit>
);

export default ChallengeOptionEdit;
