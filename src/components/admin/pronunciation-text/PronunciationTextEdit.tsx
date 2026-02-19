import { Edit, SimpleForm, TextInput, NumberInput, SelectInput, BooleanInput } from "react-admin";

const PronunciationTextEdit = () => {
  return (
    <Edit title="Edit Pronunciation Text">
      <SimpleForm>
        <NumberInput source="id" label="ID" disabled fullWidth />
        <NumberInput source="courseId" label="Course ID" />
        <TextInput source="text" label="Practice Text" multiline rows={3} fullWidth />
        <SelectInput
          source="difficulty"
          label="Difficulty"
          choices={[
            { id: "beginner", name: "Beginner" },
            { id: "intermediate", name: "Intermediate" },
            { id: "advanced", name: "Advanced" },
          ]}
        />
        <TextInput source="category" label="Category" helperText="e.g., greetings, numbers, food, travel" />
        <NumberInput source="order" label="Display Order" />
        <BooleanInput source="aiGenerated" label="AI Generated" disabled />
        <TextInput source="generatedPrompt" label="AI Prompt Used" disabled multiline rows={2} />
      </SimpleForm>
    </Edit>
  );
};

export default PronunciationTextEdit;

