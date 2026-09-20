import type { z } from "zod";
import { createMcpHandler } from "mcp-handler";

import { SERVER_INSTRUCTIONS } from "~/lib/constants";
import { compileAgentLayerTool } from "~/lib/tools/compile-agent-layer";
import { listOntologyTool } from "~/lib/tools/list-ontology";
import { matchJobTool } from "~/lib/tools/match-job";

export const maxDuration = 60;

const handler = createMcpHandler(
  (server) => {
    const registerTextTool = (
      tool: { name: string; description: string; inputSchema: z.ZodType },
      run: (args: any) => Promise<string[]>,
    ) => {
      server.registerTool(
        tool.name,
        {
          description: tool.description,
          inputSchema: tool.inputSchema,
          annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
        },
        async (args) => {
          const blocks = await run(args);
          return { content: blocks.map((text) => ({ type: "text" as const, text })) };
        },
      );
    };

    registerTextTool(compileAgentLayerTool, (args) => compileAgentLayerTool.execute(args));
    registerTextTool(matchJobTool, (args) => matchJobTool.execute(args));
    registerTextTool(listOntologyTool, () => listOntologyTool.execute());
  },
  {
    instructions: SERVER_INSTRUCTIONS,
    serverInfo: { name: "resumaxx", version: "0.1.0" },
  },
);

export { handler as GET, handler as POST, handler as DELETE };
