import { Edit, SimpleForm, TextInput, SelectInput, DateField } from "react-admin";

const PageEdit = () => (
  <Edit>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": { marginBottom: "24px" },
      }}
    >
      <TextInput
        source="id"
        label="ID"
        disabled
        fullWidth
      />

      <TextInput
        source="title"
        label="Page Title"
        fullWidth
        helperText="The main title of the page"
        required
      />

      <TextInput
        source="slug"
        label="URL Slug"
        fullWidth
        helperText="URL-friendly version (e.g., about-us, privacy-policy)"
        required
      />

      <SelectInput
        source="language"
        label="Language"
        choices={[
          { id: "en", name: "🇺🇸 English" },
          { id: "es", name: "🇪🇸 Spanish" },
          { id: "fr", name: "🇫🇷 French" },
          { id: "de", name: "🇩🇪 German" },
          { id: "it", name: "🇮🇹 Italian" },
          { id: "pt", name: "🇵🇹 Portuguese" },
          { id: "ja", name: "🇯🇵 Japanese" },
          { id: "zh", name: "🇨🇳 Chinese" },
        ]}
        helperText="The language of this page content"
        fullWidth
        required
      />

      <TextInput
        source="metaDescription"
        label="Meta Description"
        fullWidth
        helperText="SEO description (150-160 characters)"
        multiline
        rows={2}
      />

      <TextInput
        source="content"
        label="Page Content (HTML)"
        fullWidth
        helperText="Use HTML tags for formatting. Example: <h1>Heading</h1> <p>Paragraph</p>"
        multiline
        rows={15}
        required
        sx={{
          "& textarea": {
            fontFamily: "monospace",
            fontSize: "14px",
          },
        }}
      />

      <SelectInput
        source="status"
        label="Status"
        choices={[
          { id: "draft", name: "Draft" },
          { id: "published", name: "Published" },
        ]}
        helperText="Draft pages won't be visible to users"
        fullWidth
        required
      />

      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        <DateField
          source="createdAt"
          label="Created"
          showTime
          sx={{ color: "#737373" }}
        />
        <DateField
          source="updatedAt"
          label="Last Updated"
          showTime
          sx={{ color: "#737373" }}
        />
      </div>
    </SimpleForm>
  </Edit>
);

export default PageEdit;

