export const SERVER_INSTRUCTIONS = `ResuMaxx compiles a machine-readable agent layer from resume text.

Host model duties:
- Parse whatever the user uploaded (pdf, docx, image, LinkedIn export, raw text).
- Extract plain text yourself. Do not send binary to this server.
- Call compile_agent_layer with that text.
- If the user also has a job description, call match_job with resume text and the JD.
- Return the markdown block so the user can paste it after their human resume.

This server does not redesign the human page. It only builds the agent page:
ontology ids, merged years, keyword type, ATS tokens.`;

export const COMPILE_DESCRIPTION =
  "Compile a machine-readable resume layer from plain text. Input is a LinkedIn export or resume text the host model already extracted. Output is markdown to paste after the human resume.";

export const MATCH_DESCRIPTION =
  "Score a job description against resume text using the ResuMaxx ontology. Returns present/missing skill ids, keyword gaps, and the compiled agent layer.";

export const LIST_ONTOLOGY_DESCRIPTION =
  "List canonical skill ids, families, and aliases the compiler collapses into.";
