import { z } from "zod";

import { LIST_ONTOLOGY_DESCRIPTION } from "~/lib/constants";
import {
  CULTURE_NODES,
  INDUSTRY_NODES,
  INTEREST_NODES,
  VALUE_NODES,
} from "~/lib/axes";
import { ONTOLOGY_VERSION, SKILL_NODES, families } from "~/lib/ontology";

const inputSchema = z.object({});

export const listOntologyTool = {
  name: "list_ontology",
  description: LIST_ONTOLOGY_DESCRIPTION,
  inputSchema,
  execute: async (): Promise<string[]> => {
    const lines = [
      `# ${ONTOLOGY_VERSION}`,
      "",
      `skill_families: ${families().join(", ")}`,
      "axes: industry, culture, value, interest",
      "",
      "## skills",
    ];
    for (const node of SKILL_NODES) {
      lines.push(`- ${node.family}.${node.id}`);
      lines.push(`  label: ${node.label}`);
      lines.push(`  aliases: ${node.aliases.join(", ")}`);
      if (node.related?.length) lines.push(`  related: ${node.related.join(", ")}`);
    }
    const dump = (title: string, nodes: { id: string; label: string; aliases: string[] }[]) => {
      lines.push("");
      lines.push(`## ${title}`);
      for (const node of nodes) {
        lines.push(`- ${title}.${node.id}`);
        lines.push(`  label: ${node.label}`);
        lines.push(`  aliases: ${node.aliases.join(", ")}`);
      }
    };
    dump("industry", INDUSTRY_NODES);
    dump("culture", CULTURE_NODES);
    dump("value", VALUE_NODES);
    dump("interest", INTEREST_NODES);
    return [lines.join("\n")];
  },
};
