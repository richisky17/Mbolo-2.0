import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";

const PageCreate = () => (
  <Create>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": { marginBottom: "24px" },
      }}
    >
      <TextInput
        source="title"
        label="Page Title"
        fullWidth
        helperText="The main title of the page"
        placeholder="e.g., About Us, Privacy Policy"
        required
      />

      <TextInput
        source="slug"
        label="URL Slug"
        fullWidth
        helperText="URL-friendly version (e.g., about-us, privacy-policy)"
        placeholder="e.g., about-us"
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
        defaultValue="en"
        helperText="Select the language for this page content"
        fullWidth
        required
      />

      <TextInput
        source="metaDescription"
        label="Meta Description"
        fullWidth
        helperText="SEO description (150-160 characters)"
        placeholder="Brief description for search engines"
        multiline
        rows={2}
      />

      <TextInput
        source="content"
        label="Page Content (HTML)"
        fullWidth
        helperText="Use HTML tags for formatting. Example: <h1>Heading</h1> <p>Paragraph</p>"
        placeholder="Enter your page content here..."
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
        defaultValue="draft"
        helperText="Draft pages won't be visible to users"
        fullWidth
        required
      />
    </SimpleForm>
  </Create>
);

export default PageCreate;

