import { compileAgentLayer } from "~/lib/compile";
import { scanSkills } from "~/lib/ontology";

export function matchJob(resumeText: string, jobText: string): string {
  const layer = compileAgentLayer(resumeText);
  const needed = scanSkills(jobText);
  const have = new Map(layer.tenures.map((t) => [t.node.id, t]));
  const hits = needed.filter((n) => have.has(n.id)).sort((a, b) => a.id.localeCompare(b.id));
  const misses = needed.filter((n) => !have.has(n.id)).sort((a, b) => a.id.localeCompare(b.id));
  const score = needed.length ? Math.round((hits.length / needed.length) * 100) : 0;

  const lines = [
    "<!-- resumaxx:job-match v1 -->",
    "# Job match",
    "",
    `score: ${score}`,
    `required_ontology_hits: ${hits.length}/${needed.length}`,
    "",
    "## present",
    ...hits.map((n) => {
      const t = have.get(n.id);
      return `- ${n.family}.${n.id} | ${t?.years ?? 0} | ${n.aliases.join(", ")}`;
    }),
    hits.length ? "" : "- none",
    "## missing",
    ...misses.map((n) => `- ${n.family}.${n.id} | ${n.aliases.join(", ")}`),
    misses.length ? "" : "- none",
    "",
    "## keywords_in_job_not_in_layer",
    ...jobKeywordsMissing(jobText, layer.markdown),
    "",
    "## agent_layer",
    "",
    layer.markdown,
  ];
  return lines.join("\n");
}

function jobKeywordsMissing(jobText: string, layerMd: string): string[] {
  const layer = layerMd.toLowerCase();
  const words = jobText.toLowerCase().match(/[a-z][a-z0-9+#./-]{3,}/g) ?? [];
  const stop = new Set(["with", "that", "this", "from", "have", "will", "your", "about", "into", "experience", "responsibilities", "requirements"]);
  const missing = new Set<string>();
  for (const w of words) {
    if (stop.has(w)) continue;
    if (!layer.includes(w)) missing.add(w);
  }
  const out = [...missing].sort().slice(0, 25).map((w) => `- ${w}`);
  return out.length ? out : ["- none"];
}
