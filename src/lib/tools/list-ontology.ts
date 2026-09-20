import { z } from "zod";

import { LIST_ONTOLOGY_DESCRIPTION } from "~/lib/constants";
import { ONTOLOGY_VERSION, SKILL_NODES, families } from "~/lib/ontology";

const inputSchema = z.object({});

export const listOntologyTool = {
  name: "list_ontology",
  description: LIST_ONTOLOGY_DESCRIPTION,
  inputSchema,
  execute: async (): Promise<string[]> => {
    const lines = [`# ${ONTOLOGY_VERSION}`, "", `families: ${families().join(", ")}`, ""];
    for (const node of SKILL_NODES) {
      lines.push(`- ${node.id}`);
      lines.push(`  label: ${node.label}`);
      lines.push(`  family: ${node.family}`);
      lines.push(`  aliases: ${node.aliases.join(", ")}`);
    }
    return [lines.join("\n")];
  },
};
