import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from "react-admin";

const SocialMediaLinkCreate = () => (
  <Create>
    <SimpleForm
      sx={{
        "& .MuiTextField-root": { marginBottom: "24px" },
      }}
    >
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
        helperText="Select the social media platform"
      />

      <TextInput
        source="url"
        label="URL"
        fullWidth
        required
        helperText="Full URL to your social media profile (e.g., https://facebook.com/yourpage)"
        placeholder="https://facebook.com/yourpage"
      />

      <NumberInput
        source="order"
        label="Display Order"
        fullWidth
        helperText="Lower numbers appear first in the footer"
        defaultValue={0}
      />
    </SimpleForm>
  </Create>
);

export default SocialMediaLinkCreate;

