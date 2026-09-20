# ResuMaxx

MCP that compiles a machine-readable resume layer for hiring agents.

The human page stays human. This server returns a second page: skill ontology, merged years, keywords, plus industry, culture, values, and interests.

Host model parses pdf, docx, image, or LinkedIn export. Host sends plain text. MCP returns markdown to paste.

Works for any occupation. An HVAC resume, an acting resume, and a banking resume all compile through the same dotted ids.

## Tools

- `compile_agent_layer` `{ text }`
- `match_job` `{ resume_text, job_text }`
- `list_ontology`

Years on the same skill merge overlapping intervals. Two board seats in the same year count once.

Output lines look like `trades.hvac | 6.0 | hvac, refrigeration, epa 608`. Aliases collapse to that id. Related-skill edges carry years forward after the first direct hit.

Lexical match is word-boundary only. Present is pinned to the first day of the current UTC month so reruns in the same month match.

Ontology v2 is occupation-agnostic. Finance, trades, performing arts, coaching, healthcare, software, and the rest collapse onto the same dotted ids. `list_ontology` dumps skills plus industry, culture, value, and interest axes.

## Run

```
pnpm install
pnpm dev
```

MCP URL: `http://localhost:3000/api/mcp`

Same shape as `nashSys/experimental`: Next 16, pnpm, `mcp-handler`, tool modules under `src/lib/tools`.
