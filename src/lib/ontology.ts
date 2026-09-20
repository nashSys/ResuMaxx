import { firstHit, norm as lexNorm, needleHits } from "~/lib/lexical";
import { SKILL_NODES as RAW_SKILL_NODES } from "~/lib/ontology-nodes";

export const ONTOLOGY_VERSION = "resumaxx.ontology.v3";

/**
 * Fixed family order. Compile and list_ontology emit in this sequence.
 * Occupation-agnostic: a plumber and a portfolio manager hit different
 * families, never different schemas.
 */
export const FAMILY_ORDER = [
  "ai",
  "leadership",
  "product",
  "automation",
  "engineering",
  "security",
  "trades",
  "science",
  "finance",
  "sales",
  "marketing",
  "creative",
  "operations",
  "quality",
  "legal",
  "clinical",
  "public",
  "transport",
  "culinary",
  "wellness",
  "data",
  "delivery",
  "people",
  "domain",
] as const;

export type FamilyId = (typeof FAMILY_ORDER)[number];

export type SkillNode = {
  id: string;
  label: string;
  family: FamilyId;
  aliases: string[];
  related?: string[];
};

/**
 * Ids whose kebab form is a common English word. Do not scan the id itself;
 * label + aliases carry the match. Stops "director" and "trust" from lighting
 * up every resume.
 */
const SKIP_ID_SCAN = new Set([
  "trust",
  "equity",
  "service",
  "craft",
  "safety",
  "policy",
  "owner",
  "chief",
  "director",
  "producer",
  "plant",
  "media",
  "cloud",
  "java",
  "energy",
  "sports",
  "retail",
  "government",
  "nonprofit",
  "writing",
  "teaching",
  "coaching",
  "nursing",
  "trading",
  "banking",
  "tax",
  "audit",
  "contracts",
  "compliance",
  "logistics",
  "facilities",
  "construction",
  "welding",
  "plumbing",
  "carpentry",
  "automotive",
  "agriculture",
  "entertainment",
  "manufacturing",
  "acting",
]);

export const SKILL_NODES: SkillNode[] = RAW_SKILL_NODES as SkillNode[];

export function norm(value: string): string {
  return lexNorm(value);
}

export function dottedId(node: SkillNode): string {
  return `${node.family}.${node.id}`;
}

export function nodeNeedles(node: SkillNode): string[] {
  const fromId = SKIP_ID_SCAN.has(node.id) ? [] : [node.id.replace(/-/g, " ")];
  return [...fromId, node.label, ...node.aliases];
}

export function resolveSkill(term: string): SkillNode | undefined {
  const n = lexNorm(term);
  if (!n) return undefined;
  const exact = SKILL_NODES.find(
    (node) => lexNorm(node.id) === n || lexNorm(node.label) === n || node.aliases.some((a) => lexNorm(a) === n),
  );
  if (exact) return exact;
  return scanSkills(term)[0];
}

export function scanSkills(text: string): SkillNode[] {
  const hits = firstHit(text, SKILL_NODES, nodeNeedles);
  hits.sort((a, b) => {
    const fa = FAMILY_ORDER.indexOf(a.family);
    const fb = FAMILY_ORDER.indexOf(b.family);
    if (fa !== fb) return fa - fb;
    return a.id.localeCompare(b.id);
  });
  return hits;
}

export function roleHitsNode(text: string, node: SkillNode): boolean {
  return nodeNeedles(node).some((needle) => needleHits(text, needle));
}

export function families(): string[] {
  const have = new Set(SKILL_NODES.map((n) => n.family));
  return FAMILY_ORDER.filter((f) => have.has(f));
}

export function assertOntology(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const node of SKILL_NODES) {
    if (ids.has(node.id)) errors.push(`duplicate id ${node.id}`);
    ids.add(node.id);
    if (!FAMILY_ORDER.includes(node.family)) errors.push(`unknown family ${node.family} on ${node.id}`);
    if (!node.aliases.length) errors.push(`no aliases on ${node.id}`);
    for (const rel of node.related ?? []) {
      if (!SKILL_NODES.some((n) => n.id === rel)) errors.push(`broken related ${node.id} -> ${rel}`);
    }
  }
  return errors;
}
