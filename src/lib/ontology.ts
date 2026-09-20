export const ONTOLOGY_VERSION = "resumaxx.ontology.v1.1";

export type SkillNode = {
  id: string;
  label: string;
  family: string;
  aliases: string[];
};

export const SKILL_NODES: SkillNode[] = [
  { id: "technology-leadership", label: "Technology Leadership", family: "leadership", aliases: ["cto", "chief technology officer", "vp engineering", "vp technology", "technology executive", "head of technology", "studio director", "engineering leader"] },
  { id: "executive-leadership", label: "Executive Leadership", family: "leadership", aliases: ["c-suite", "c suite", "president", "co-founder", "cofounder", "founder", "chief", "general manager"] },
  { id: "board-governance", label: "Board Governance", family: "leadership", aliases: ["board member", "advisory board", "board of directors", "director on board", "industry advisor"] },
  { id: "venture-building", label: "Venture Building", family: "leadership", aliases: ["venture studio", "product studio", "startup studio", "company building", "spinout", "new venture"] },
  { id: "product-management", label: "Product Management", family: "product", aliases: ["product owner", "product lead", "roadmap", "product strategy"] },
  { id: "product-studio", label: "Product Studio Operations", family: "product", aliases: ["digital product studio", "innovation studio", "r&d studio"] },
  { id: "artificial-intelligence", label: "Artificial Intelligence", family: "ai", aliases: ["ai", "artificial intelligence", "intelligent systems"] },
  { id: "machine-learning", label: "Machine Learning", family: "ai", aliases: ["ml", "machine learning", "applied ml", "predictive models"] },
  { id: "generative-ai", label: "Generative AI", family: "ai", aliases: ["generative ai", "genai", "gen ai", "llm", "large language model", "gpt", "foundation model"] },
  { id: "retrieval-augmented-generation", label: "Retrieval Augmented Generation", family: "ai", aliases: ["rag", "retrieval-augmented", "retrieval augmented", "vector search", "document qa"] },
  { id: "synthetic-data", label: "Synthetic Data", family: "ai", aliases: ["ctgan", "synthetic data", "synthetic records", "tabular gan"] },
  { id: "federated-learning", label: "Federated and Swarm Learning", family: "ai", aliases: ["swarm learning", "federated learning", "transfer learning", "decentralized learning"] },
  { id: "mlops", label: "MLOps", family: "ai", aliases: ["mlops", "model ops", "model deployment", "feature store"] },
  { id: "agentic-systems", label: "Agentic Systems", family: "ai", aliases: ["ai agent", "agentic", "multi-agent", "mcp", "tool use"] },
  { id: "knowledge-systems", label: "Knowledge Systems", family: "ai", aliases: ["ontology", "knowledge graph", "knowledge layer", "governed knowledge"] },
  { id: "process-automation", label: "Process Automation", family: "automation", aliases: ["rpa", "robotic process automation", "workflow automation", "desktop robotics", "coe"] },
  { id: "rules-engines", label: "Rules Engines", family: "automation", aliases: ["rules engine", "business rules"] },
  { id: "software-engineering", label: "Software Engineering", family: "engineering", aliases: ["software engineer", "developer", "application development", "full stack"] },
  { id: "technical-architecture", label: "Technical Architecture", family: "engineering", aliases: ["solution architecture", "system architecture", "application architecture", "technical design"] },
  { id: "cloud-platforms", label: "Cloud Platforms", family: "engineering", aliases: ["cloud", "aws", "azure", "gcp", "saas"] },
  { id: "data-architecture", label: "Data Architecture", family: "data", aliases: ["data infrastructure", "data platform", "data engineering", "etl"] },
  { id: "relational-databases", label: "Relational Databases", family: "data", aliases: ["sql", "rdbms", "db2", "postgres", "mysql", "sql server"] },
  { id: "sap-hana", label: "SAP HANA", family: "data", aliases: ["sap", "sap hana", "hana"] },
  { id: "java-ee", label: "Java Enterprise", family: "engineering", aliases: ["java", "java ee", "spring", "j2ee"] },
  { id: "web-development", label: "Web Development", family: "engineering", aliases: ["web development", "frontend", "backend", "full-stack", "angularjs"] },
  { id: "agile-delivery", label: "Agile Delivery", family: "delivery", aliases: ["agile", "scrum", "sprint", "kanban"] },
  { id: "team-building", label: "Team Building", family: "people", aliases: ["hiring", "recruit", "team design", "talent"] },
  { id: "healthcare-systems", label: "Healthcare Systems", family: "domain", aliases: ["healthcare", "health plan", "payer", "clinical", "tricare", "cms"] },
  { id: "defense-systems", label: "Defense Systems", family: "domain", aliases: ["defense", "department of war", "department of defense", "dod", "federal government", "national defense"] },
  { id: "insurance-operations", label: "Insurance Operations", family: "domain", aliases: ["insurance", "claims", "payer operations"] },
  { id: "order-to-cash", label: "Order to Cash", family: "domain", aliases: ["order to cash", "order-to-cash", "otc", "accounts receivable"] },
  { id: "procure-to-pay", label: "Procure to Pay", family: "domain", aliases: ["procure to pay", "procure-to-pay", "p2p", "accounts payable"] },
];

const ALIAS_INDEX = new Map<string, SkillNode>();
for (const node of SKILL_NODES) {
  ALIAS_INDEX.set(norm(node.id), node);
  ALIAS_INDEX.set(norm(node.label), node);
  for (const a of node.aliases) ALIAS_INDEX.set(norm(a), node);
}

export function norm(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+]+/g, " ").trim();
}

export function resolveSkill(term: string): SkillNode | undefined {
  const n = norm(term);
  if (!n) return undefined;
  const exact = ALIAS_INDEX.get(n);
  if (exact) return exact;
  for (const [alias, node] of ALIAS_INDEX) {
    if (alias.length < 3) continue;
    if (n.includes(alias) || alias.includes(n)) return node;
  }
  return undefined;
}

export function scanSkills(text: string): SkillNode[] {
  const n = norm(text);
  const found = new Map<string, SkillNode>();
  for (const node of SKILL_NODES) {
    const needles = [node.id, node.label, ...node.aliases].map(norm);
    if (needles.some((needle) => needle.length >= 2 && n.includes(needle))) {
      found.set(node.id, node);
    }
  }
  return [...found.values()];
}

export function families(): string[] {
  return [...new Set(SKILL_NODES.map((n) => n.family))];
}
