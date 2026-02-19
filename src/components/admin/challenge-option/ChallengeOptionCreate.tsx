import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  required,
  BooleanInput,
} from "react-admin";

const ChallengeOptionCreate = () => (
  <Create>
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
      <TextInput
        source="text"
        label="Option Text"
        validate={[required()]}
        fullWidth
        helperText="The text content of this answer choice"
        placeholder="e.g., el niño, la mujer"
      />
      <BooleanInput
        source="correct"
        label="Correct Answer"
        helperText="Mark this option as the correct answer"
        defaultValue={false}
      />
      <TextInput
        source="imageSrc"
        label="Image Path"
        fullWidth
        helperText="Optional: Path to an image for this option (e.g., /boy.svg)"
        placeholder="/boy.svg"
      />
      <TextInput
        source="audioSrc"
        label="Audio Path"
        fullWidth
        helperText="Optional: Path to audio pronunciation (e.g., /es_boy.mp3)"
        placeholder="/es_boy.mp3"
      />
      <ReferenceInput
        source="challengeId"
        reference="challenges"
        label="Challenge"
        fullWidth
      />
    </SimpleForm>
  </Create>
);

export default ChallengeOptionCreate;
