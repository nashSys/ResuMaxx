# ResuMaxx

MCP that compiles a machine-readable resume layer for hiring agents.

The human page stays human. This server returns a second page: skill ontology, merged years, keywords, plus industry, culture, values, and interests.

Host model parses pdf, docx, image, or LinkedIn export. Host sends plain text. MCP returns markdown to paste.

Works for any occupation. Finance, real estate, acting, HVAC, coaching, nursing, trades, software, and the rest collapse onto the same dotted-id schema.

## Tools

- `compile_agent_layer` `{ text }`
- `match_job` `{ resume_text, job_text }`
- `list_ontology`

Years on the same skill merge overlapping intervals. Two board seats in the same year count once.

Output lines look like `ai.synthetic-data | 4.5 | ctgan, synthetic data`. Aliases collapse to that id. Related-skill edges carry years forward after the first direct hit.

Lexical match is word-boundary only. Present is pinned to the first day of the current UTC month so reruns in the same month match.

Ontology v3 is occupation-agnostic. Families: ai, leadership, product, automation, engineering, security, trades, science, finance, sales, marketing, creative, operations, quality, legal, clinical, public, transport, culinary, wellness, data, delivery, people, domain.

Generic English ids do not scan from the id string. `list_ontology` dumps skills plus industry, culture, value, and interest axes.

## Run

```
pnpm install
pnpm dev
```

MCP URL: `http://localhost:3000/api/mcp`

Same shape as `nashSys/experimental`: Next 16, pnpm, `mcp-handler`, tool modules under `src/lib/tools`.
