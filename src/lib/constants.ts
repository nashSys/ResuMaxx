export const SERVER_INSTRUCTIONS = `ResuMaxx compiles a machine-readable agent layer from resume text.

Host model duties:
- Parse whatever the user uploaded (pdf, docx, image, LinkedIn export, raw text).
- Extract plain text yourself. Do not send binary to this server.
- Keep dated role lines and product nouns in the text you send. Years attach only where aliases or related skills hit.
- Call compile_agent_layer with that text.
- If the user also has a job description, call match_job with resume text and the JD.
- Paste the returned markdown after the human resume. Do not rewrite ids or years.

Output contract (deterministic):
- Skill lines: family.id | years | aliases
- Evidence line under each skill: evidence: role labels, A-Z
- Axis lines: axis.id | aliases
- Families emit in fixed order: ai, leadership, product, automation, engineering, data, delivery, people, domain
- Axes emit in fixed order: industry, culture, value, interest
- Roles sort by start date descending, then title
- Present = first day of current UTC month
- Overlapping intervals merge. Concurrent board seats do not double-count
- Lexical collapse is word-boundary only. Short tokens (ai, ml, rag, rpa) match as whole words
- Related-skill carry: after the first direct hit, later roles that hit a node's related[] ids add years
- Keywords: known product terms present in the text, then remaining frequent tokens
- Same input text in the same UTC month produces the same markdown`;

export const COMPILE_DESCRIPTION =
  "Compile a machine-readable resume layer from plain text. Output uses dotted family.id lines with merged years and alias collapse. Host extracts text first.";

export const MATCH_DESCRIPTION =
  "Score a job description against resume text using the ResuMaxx ontology. Returns present/missing dotted ids, keyword gaps, and the compiled agent layer.";

export const LIST_ONTOLOGY_DESCRIPTION =
  "List canonical skill ids, families, aliases, related-skill edges, and industry/culture/value/interest axes.";
