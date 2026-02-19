import { Create, SimpleForm, TextInput, NumberInput, SelectInput, BooleanInput, useNotify, useRedirect } from "react-admin";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Sparkles } from "lucide-react";

const PronunciationTextCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWithAI = async () => {
    setIsGenerating(true);
    try {
      // Get form values from react-admin form context
      const courseIdInput = document.querySelector('input[name="courseId"]') as HTMLInputElement;
      const difficultySelect = document.querySelector('select[name="difficulty"]') as HTMLSelectElement;
      const categoryInput = document.querySelector('input[name="category"]') as HTMLInputElement;

      const formData = {
        courseId: courseIdInput?.value ? parseInt(courseIdInput.value) : null,
        difficulty: difficultySelect?.value || "beginner",
        category: categoryInput?.value || "",
        count: 5,
      };

      const response = await fetch("/api/admin/pronunciation-texts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate texts");
      }

      const data = await response.json();
      
      if (data.texts && data.texts.length > 0) {
        notify(`Successfully generated ${data.texts.length} pronunciation texts!`, { type: "success" });
        setTimeout(() => {
          redirect("/pronunciation-texts");
        }, 1000);
      } else {
        notify("No texts generated. Please try again.", { type: "warning" });
      }
    } catch (error: any) {
      console.error("Error generating texts:", error);
      notify(error.message || "Failed to generate texts. Please check your API configuration.", { type: "error" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Create title="Create Pronunciation Text">
      <SimpleForm>
        <NumberInput source="courseId" label="Course ID" helperText="Leave empty for general practice texts" />
        <TextInput source="text" label="Practice Text" multiline rows={3} fullWidth />
        <SelectInput
          source="difficulty"
          label="Difficulty"
          choices={[
            { id: "beginner", name: "Beginner" },
            { id: "intermediate", name: "Intermediate" },
            { id: "advanced", name: "Advanced" },
          ]}
          defaultValue="beginner"
        />
        <TextInput source="category" label="Category" helperText="e.g., greetings, numbers, food, travel" />
        <NumberInput source="order" label="Display Order" defaultValue={0} />
        <BooleanInput source="aiGenerated" label="AI Generated" defaultValue={false} />
        
        <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f0f9ff", borderRadius: "8px", border: "2px solid #0ea5e9" }}>
          <h3 style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px", fontSize: "18px", fontWeight: "600" }}>
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>AI Generation</span>
          </h3>
          <p style={{ marginBottom: "16px", color: "#64748b", fontSize: "14px" }}>
            Generate multiple pronunciation practice texts automatically using AI. Fill in Course ID, Difficulty, and Category above, then click the button below.
          </p>
          <Button
            variant="contained"
            onClick={generateWithAI}
            disabled={isGenerating}
            startIcon={isGenerating ? <CircularProgress size={16} color="inherit" /> : <Sparkles className="w-4 h-4" />}
            sx={{
              backgroundColor: "#0ea5e9",
              "&:hover": { backgroundColor: "#0284c7" },
            }}
          >
            {isGenerating ? "Generating..." : "Generate 5 Texts with AI"}
          </Button>
        </div>
      </SimpleForm>
    </Create>
  );
};

export default PronunciationTextCreate;

