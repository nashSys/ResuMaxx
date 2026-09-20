import { dottedAxis, scanAllAxes, type AxisId, type AxisNode } from "~/lib/axes";
import {
  FAMILY_ORDER,
  ONTOLOGY_VERSION,
  SKILL_NODES,
  dottedId,
  roleHitsNode,
  type SkillNode,
} from "~/lib/ontology";
import { extraKeywords, parseResume, type ParsedResume, type Role } from "~/lib/parse";
import { coveredYears, roundYears, type Interval } from "~/lib/years";

export const AXIS_ORDER: AxisId[] = ["industry", "culture", "value", "interest"];

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

function roleStart(role: Role): number {
  return role.interval ? role.interval.start.getTime() : 0;
}

function collectTenures(roles: Role[]): SkillTenure[] {
  const byId = new Map<string, SkillNode>();
  for (const node of SKILL_NODES) byId.set(node.id, node);

  const buckets = new Map<string, { node: SkillNode; intervals: Interval[]; roles: Set<string> }>();

  const ensure = (node: SkillNode) => {
    let bucket = buckets.get(node.id);
    if (!bucket) {
      bucket = { node, intervals: [], roles: new Set() };
      buckets.set(node.id, bucket);
    }
    return bucket;
  };

  for (const node of SKILL_NODES) {
    const direct = roles.filter((role) => roleHitsNode(`${role.title} ${role.org} ${role.text}`, node));
    if (!direct.length) continue;
    const first = Math.min(...direct.map(roleStart).filter(Boolean));
    const related = (node.related ?? [])
      .map((id) => byId.get(id))
      .filter((n): n is SkillNode => Boolean(n));
    const extra = roles.filter((role) => {
      if (!role.interval || role.interval.start.getTime() < first) return false;
      const blob = `${role.title} ${role.org} ${role.text}`;
      return related.some((rel) => roleHitsNode(blob, rel));
    });
    const used = [...direct, ...extra];
    const bucket = ensure(node);
    for (const role of used) {
      if (role.interval) bucket.intervals.push(role.interval);
      bucket.roles.add(roleLabel(role));
    }
  }

  return [...buckets.values()]
    .map((b) => ({
      node: b.node,
      years: roundYears(coveredYears(b.intervals)),
      roles: [...b.roles].sort((a, b) => a.localeCompare(b)),
    }))
    .filter((t) => t.years > 0 || t.roles.length)
    .sort((a, b) => {
      const fa = FAMILY_ORDER.indexOf(a.node.family as (typeof FAMILY_ORDER)[number]);
      const fb = FAMILY_ORDER.indexOf(b.node.family as (typeof FAMILY_ORDER)[number]);
      if (fa !== fb) return fa - fb;
      return a.node.id.localeCompare(b.node.id);
    });
}

function calendarSpan(roles: Role[]): number {
  const intervals = roles.map((r) => r.interval).filter((i): i is Interval => Boolean(i));
  return roundYears(coveredYears(intervals));
}

function formatRole(role: Role): string {
  const yrs = role.interval
    ? roundYears((role.interval.end.getTime() - role.interval.start.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : "";
  const skills = role.skills.map((s) => s.id).join(", ");
  return [role.title, role.org, role.rawDates, yrs !== "" ? `${yrs}y` : "", skills].filter(Boolean).join(" | ");
}

export function renderAgentMarkdown(layer: Omit<CompiledLayer, "markdown">): string {
  const { parsed, tenures, axes, calendarYears, keywords } = layer;
  const lines: string[] = [];
  lines.push("<!-- resumaxx:agent-layer v1 -->");
  lines.push("# Agent layer");
  lines.push(`ontology: ${ONTOLOGY_VERSION}`);
  lines.push("axes: skill, industry, culture, value, interest");
  lines.push("collapse: aliases map to one id. years merge overlapping intervals.");
  lines.push("");
  lines.push("IDENTITY");
  if (parsed.name) lines.push(`name: ${parsed.name}`);
  if (parsed.headline) lines.push(`headline: ${parsed.headline}`);
  if (parsed.location) lines.push(`location: ${parsed.location}`);
  for (const c of parsed.contact) lines.push(`contact: ${c}`);
  lines.push("");
  lines.push("TENURE");
  lines.push(`calendar_years_covered: ${calendarYears}`);
  lines.push("aggregation: overlapping titles merge. Concurrent board seats count once. Skill years follow the work across firms.");
  lines.push(`role_count: ${parsed.roles.length}`);
  lines.push("");
  lines.push("ROLES");
  const roles = [...parsed.roles].sort((a, b) => roleStart(b) - roleStart(a) || a.title.localeCompare(b.title));
  for (const role of roles) lines.push(formatRole(role));
  if (!roles.length) lines.push("none extracted. Host model should send dated role blocks.");
  lines.push("");
  lines.push("ONTOLOGY");
  for (const t of tenures) {
    lines.push(`${dottedId(t.node)} | ${t.years} | ${t.node.aliases.join(", ")}`);
    if (t.roles.length) lines.push(`  evidence: ${t.roles.join("; ")}`);
  }
  if (!tenures.length) lines.push("No ontology hits. Add dated roles and common skill names.");
  lines.push("");
  for (const axis of AXIS_ORDER) {
    lines.push(axis.toUpperCase());
    const rows = [...(axes[axis] ?? [])].sort((a, b) => a.id.localeCompare(b.id));
    if (!rows.length) lines.push("none detected");
    for (const n of rows) {
      lines.push(`${dottedAxis(n)} | ${n.aliases.join(", ")}`);
    }
    lines.push("");
  }
  lines.push("KEYWORDS");
  lines.push("type: keyword");
  if (!keywords.length) lines.push("none");
  else lines.push(keywords.join(", "));
  lines.push("");
  lines.push("ATS_TOKENS");
  const tokens = [
    ...tenures.map((t) => t.node.label),
    ...tenures.flatMap((t) => t.node.aliases.slice(0, 3)),
    ...keywords,
  ];
  lines.push([...new Set(tokens)].join(", "));
  lines.push("");
  return lines.join("\n");
}

const PRODUCT_KEYWORDS = [
  "CTGAN",
  "synthetic data",
  "RAG",
  "Tricare Operator's Manual",
  "swarm learning",
  "transfer learning",
  "Sublim COS",
  "MCP",
  "ontology",
  "Intrep.io",
  "Prodigy",
  "CUBE",
  "Department of War",
  "CMS",
];

export function compileAgentLayer(text: string): CompiledLayer {
  const parsed = parseResume(text);
  parsed.roles.sort((a, b) => roleStart(b) - roleStart(a) || a.title.localeCompare(b.title));
  parsed.contact.sort((a, b) => a.localeCompare(b));
  const tenures = collectTenures(parsed.roles);
  const known = new Set(
    SKILL_NODES.flatMap((n) => [n.id, n.label, ...n.aliases].map((s) => s.toLowerCase())),
  );
  const products = PRODUCT_KEYWORDS.filter((term) => text.toLowerCase().includes(term.toLowerCase()));
  const extras = extraKeywords(text, known).filter(
    (k) => !products.some((p) => p.toLowerCase() === k.toLowerCase()),
  );
  const keywords = [...products, ...extras];
  const calendarYears = calendarSpan(parsed.roles);
  const axes = scanAllAxes(text);
  const base = { parsed, tenures, axes, calendarYears, keywords };
  return { ...base, markdown: renderAgentMarkdown(base) };
}
