import { scanAllAxes, type AxisId, type AxisNode } from "~/lib/axes";
import { ONTOLOGY_VERSION, SKILL_NODES, scanSkills, type SkillNode } from "~/lib/ontology";
import { extraKeywords, parseResume, type ParsedResume, type Role } from "~/lib/parse";
import { coveredYears, mergeIntervals, roundYears, type Interval } from "~/lib/years";

export type SkillTenure = {
  node: SkillNode;
  years: number;
  roles: string[];
};

export type CompiledLayer = {
  parsed: ParsedResume;
  tenures: SkillTenure[];
  axes: Record<AxisId, AxisNode[]>;
  calendarYears: number;
  keywords: string[];
  markdown: string;
};

function roleLabel(role: Role): string {
  return [role.title, role.org].filter(Boolean).join(" / ");
}

function collectTenures(roles: Role[]): SkillTenure[] {
  const buckets = new Map<string, { node: SkillNode; intervals: Interval[]; roles: Set<string> }>();
  for (const role of roles) {
    const skills = role.skills.length ? role.skills : scanSkills(`${role.title} ${role.org} ${role.text}`);
    for (const node of skills) {
      let bucket = buckets.get(node.id);
      if (!bucket) {
        bucket = { node, intervals: [], roles: new Set() };
        buckets.set(node.id, bucket);
      }
      if (role.interval) bucket.intervals.push(role.interval);
      bucket.roles.add(roleLabel(role));
    }
  }
  return [...buckets.values()]
    .map((b) => ({
      node: b.node,
      years: roundYears(coveredYears(b.intervals)),
      roles: [...b.roles],
    }))
    .sort((a, b) => b.years - a.years || a.node.id.localeCompare(b.node.id));
}

function calendarSpan(roles: Role[]): number {
  const intervals = roles.map((r) => r.interval).filter((i): i is Interval => Boolean(i));
  return roundYears(coveredYears(intervals));
}

export function renderAgentMarkdown(layer: Omit<CompiledLayer, "markdown">): string {
  const { parsed, tenures, axes, calendarYears, keywords } = layer;
  const lines: string[] = [];
  lines.push("<!-- resumaxx:agent-layer v1 -->");
  lines.push("# Agent layer");
  lines.push("");
  lines.push("Human resume stays on page one. This block is for parsers and hiring agents.");
  lines.push("");
  lines.push("## identity");
  if (parsed.name) lines.push(`name: ${parsed.name}`);
  if (parsed.headline) lines.push(`headline: ${parsed.headline}`);
  if (parsed.location) lines.push(`location: ${parsed.location}`);
  for (const c of parsed.contact) lines.push(`contact: ${c}`);
  lines.push(`ontology: ${ONTOLOGY_VERSION}`);
  lines.push("");
  lines.push("## tenure");
  lines.push(`calendar_years_covered: ${calendarYears}`);
  lines.push("aggregation: overlapping roles merge; concurrent board seats do not double-count.");
  lines.push(`role_count: ${parsed.roles.length}`);
  lines.push("");
  lines.push("## roles");
  for (const role of parsed.roles) {
    const yrs = role.interval ? roundYears((role.interval.end.getTime() - role.interval.start.getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : "";
    lines.push(`- title: ${role.title}`);
    if (role.org) lines.push(`  org: ${role.org}`);
    lines.push(`  dates: ${role.rawDates}${yrs !== "" ? ` | years: ${yrs}` : ""}`);
    if (role.skills.length) lines.push(`  skills: ${role.skills.map((s) => s.id).join(", ")}`);
  }
  if (!parsed.roles.length) lines.push("- none extracted. Host model should send cleaner dated role blocks.");
  lines.push("");
  lines.push("## ontology");
  const byFamily = new Map<string, SkillTenure[]>();
  for (const t of tenures) {
    const list = byFamily.get(t.node.family) ?? [];
    list.push(t);
    byFamily.set(t.node.family, list);
  }
  for (const family of [...byFamily.keys()].sort()) {
    lines.push(`### ${family}`);
    for (const t of byFamily.get(family) ?? []) {
      lines.push(`- id: ${t.node.id}`);
      lines.push(`  label: ${t.node.label}`);
      lines.push(`  years: ${t.years}`);
      lines.push(`  aliases: ${t.node.aliases.join(", ")}`);
      lines.push(`  evidence: ${t.roles.join("; ")}`);
    }
    lines.push("");
  }
  if (!tenures.length) {
    lines.push("No ontology hits. Add dated roles and common skill names.");
    lines.push("");
  }
  const axisOrder: AxisId[] = ["industry", "culture", "value", "interest"];
  for (const axis of axisOrder) {
    lines.push(`## ${axis}`);
    const rows = axes[axis] ?? [];
    if (!rows.length) lines.push("- none detected");
    for (const n of rows) {
      lines.push(`- id: ${n.id}`);
      lines.push(`  label: ${n.label}`);
      lines.push(`  aliases: ${n.aliases.join(", ")}`);
    }
    lines.push("");
  }

  lines.push("## keywords");
  lines.push("type: keyword");
  for (const k of keywords) lines.push(`- ${k}`);
  if (!keywords.length) lines.push("- none");
  lines.push("");
  lines.push("## ats_tokens");
  const tokens = [
    ...tenures.map((t) => t.node.label),
    ...tenures.flatMap((t) => t.node.aliases.slice(0, 3)),
    ...keywords.slice(0, 20),
  ];
  lines.push([...new Set(tokens)].join(", "));
  lines.push("");
  return lines.join("\n");
}

export function compileAgentLayer(text: string): CompiledLayer {
  const parsed = parseResume(text);
  const tenures = collectTenures(parsed.roles);
  const known = new Set(SKILL_NODES.flatMap((n) => [n.id, n.label, ...n.aliases].map((s) => s.toLowerCase())));
  const keywords = extraKeywords(text, known);
  const calendarYears = calendarSpan(parsed.roles);
  const axes = scanAllAxes(text);
  const base = { parsed, tenures, axes, calendarYears, keywords };
  return { ...base, markdown: renderAgentMarkdown(base) };
}
