# ResuMaxx

MCP that compiles a machine-readable resume layer for hiring agents.

The human page stays human. This server returns a second page: ontology ids, merged years, and keywords.

Host model parses pdf, docx, image, or LinkedIn export. Host sends plain text. MCP returns markdown to paste.

## Tools

- `compile_agent_layer` `{ text }`
- `match_job` `{ resume_text, job_text }`
- `list_ontology`

Years on the same skill merge overlapping intervals. Two board seats in the same year count once.

## Run

```
pnpm install
pnpm dev
```

MCP URL: `http://localhost:3000/api/mcp`

Same shape as `nashSys/experimental`: Next 16, pnpm, `mcp-handler`, tool modules under `src/lib/tools`.
