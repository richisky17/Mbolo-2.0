import { SimpleForm, Edit, TextInput, required } from "react-admin";

const CourseEdit = () => (
  <Edit>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": {
          marginBottom: "24px",
        },
      }}
    >
      <TextInput source="id" label="Course ID" disabled fullWidth />
      <TextInput
        source="title"
        label="Course Title"
        validate={[required()]}
        fullWidth
        helperText="The name of the language course"
      />
      <TextInput
        source="imageSrc"
        label="Flag Image Path"
        validate={[required()]}
        fullWidth
        helperText="Path to the flag image"
        placeholder="/es.svg"
      />
    </SimpleForm>
  </Edit>
);

export default CourseEdit;
