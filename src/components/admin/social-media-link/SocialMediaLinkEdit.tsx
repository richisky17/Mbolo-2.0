import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from "react-admin";

const SocialMediaLinkEdit = () => (
  <Edit>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": { marginBottom: "24px" },
      }}
    >
      <TextInput source="id" label="ID" disabled fullWidth />

      <SelectInput
        source="platform"
        label="Platform"
        choices={[
          { id: "facebook", name: "Facebook" },
          { id: "twitter", name: "Twitter" },
          { id: "instagram", name: "Instagram" },
          { id: "youtube", name: "YouTube" },
          { id: "linkedin", name: "LinkedIn" },
          { id: "tiktok", name: "TikTok" },
          { id: "discord", name: "Discord" },
        ]}
        fullWidth
        required
      />

      <TextInput
        source="url"
        label="URL"
        fullWidth
        required
        helperText="Full URL to your social media profile"
      />

      <NumberInput
        source="order"
        label="Display Order"
        fullWidth
        helperText="Lower numbers appear first in the footer"
      />
    </SimpleForm>
  </Edit>
);

export default SocialMediaLinkEdit;

