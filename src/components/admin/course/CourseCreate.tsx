import { SimpleForm, Create, TextInput, required } from "react-admin";

const CourseCreate = () => (
  <Create>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": {
          marginBottom: "24px",
        },
      }}
    >
      <TextInput
        source="title"
        label="Course Title"
        validate={[required()]}
        fullWidth
        helperText="Enter the name of the language course (e.g., Spanish, French)"
      />
      <TextInput
        source="imageSrc"
        label="Flag Image Path"
        validate={[required()]}
        fullWidth
        helperText="Enter the path to the flag image (e.g., /es.svg)"
        placeholder="/es.svg"
      />
    </SimpleForm>
  </Create>
);

export default CourseCreate;
