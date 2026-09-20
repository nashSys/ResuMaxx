import { z } from "zod";

import { MATCH_DESCRIPTION } from "~/lib/constants";
import { matchJob } from "~/lib/match";

const inputSchema = z.object({
  resume_text: z.string().min(40).describe("Plain text resume or LinkedIn export."),
  job_text: z.string().min(20).describe("Plain text job description."),
});

export const matchJobTool = {
  name: "match_job",
  description: MATCH_DESCRIPTION,
  inputSchema,
  execute: async (args: z.infer<typeof inputSchema>): Promise<string[]> => {
    try {
      return [matchJob(args.resume_text, args.job_text)];
    } catch (err) {
      console.error("match_job failed:", err);
      return ["Error: match failed"];
    }
  },
};
