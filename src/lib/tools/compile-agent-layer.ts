import { z } from "zod";

import { COMPILE_DESCRIPTION } from "~/lib/constants";
import { compileAgentLayer } from "~/lib/compile";

const inputSchema = z.object({
  text: z
    .string()
    .min(40)
    .describe("Plain text of a resume or LinkedIn profile export. Host model extracts this from any file or image."),
});

export const compileAgentLayerTool = {
  name: "compile_agent_layer",
  description: COMPILE_DESCRIPTION,
  inputSchema,
  execute: async (args: z.infer<typeof inputSchema>): Promise<string[]> => {
    try {
      const layer = compileAgentLayer(args.text);
      return [layer.markdown];
    } catch (err) {
      console.error("compile_agent_layer failed:", err);
      return ["Error: compile failed"];
    }
  },
};
