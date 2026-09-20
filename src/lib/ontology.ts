import { firstHit, norm as lexNorm, needleHits } from "~/lib/lexical";

export const ONTOLOGY_VERSION = "resumaxx.ontology.v2";

export const FAMILY_ORDER = [
  "ai", "leadership", "product", "automation", "engineering", "trades", "finance", "sales", "marketing", "creative", "operations", "legal", "clinical", "data", "delivery", "people", "domain",
] as const;

export type SkillNode = {
  id: string;
  label: string;
  family: string;
  aliases: string[];
  related?: string[];
};

export const SKILL_NODES: SkillNode[] = [
  { id: "technology-leadership", label: "Technology Leadership", family: "leadership", aliases: ["cto", "chief technology officer", "vp engineering", "vp technology", "technology executive", "head of technology", "studio director", "engineering leader", "cio", "chief information officer"] },
  { id: "executive-leadership", label: "Executive Leadership", family: "leadership", aliases: ["c-suite", "c suite", "president", "co-founder", "cofounder", "founder", "chief", "general manager", "ceo", "managing director", "owner"] },
  { id: "board-governance", label: "Board Governance", family: "leadership", aliases: ["board member", "advisory board", "board of directors", "director on board", "industry advisor", "trustee"] },
  { id: "venture-building", label: "Venture Building", family: "leadership", aliases: ["venture studio", "product studio", "startup studio", "company building", "spinout", "new venture"] },
  { id: "general-management", label: "General Management", family: "leadership", aliases: ["general manager", "gm", "business unit lead", "p and l", "p&l", "store manager", "branch manager"] },
  { id: "operations-leadership", label: "Operations Leadership", family: "leadership", aliases: ["vp operations", "director of operations", "head of operations", "coo", "chief operating officer"] },
  { id: "sales-leadership", label: "Sales Leadership", family: "leadership", aliases: ["vp sales", "head of sales", "sales director", "chief revenue officer", "cro"] },
  { id: "practice-leadership", label: "Practice Leadership", family: "leadership", aliases: ["managing partner", "practice lead", "practice director", "office managing"] },
  { id: "product-management", label: "Product Management", family: "product", aliases: ["product owner", "product lead", "roadmap", "product strategy"] },
  { id: "product-studio", label: "Product Studio Operations", family: "product", aliases: ["digital product studio", "innovation studio", "r&d studio"] },
  { id: "artificial-intelligence", label: "Artificial Intelligence", family: "ai", aliases: ["ai", "artificial intelligence", "intelligent systems"] },
  { id: "machine-learning", label: "Machine Learning", family: "ai", aliases: ["ml", "machine learning", "applied ml", "predictive models"] },
  { id: "generative-ai", label: "Generative AI", family: "ai", aliases: ["generative ai", "generative technology", "genai", "gen ai", "llm", "large language model", "gpt", "foundation model"], related: ["synthetic-data", "agentic-systems"] },
  { id: "retrieval-augmented-generation", label: "Retrieval Augmented Generation", family: "ai", aliases: ["rag", "retrieval-augmented", "retrieval augmented", "vector search", "document qa"], related: ["knowledge-systems"] },
  { id: "synthetic-data", label: "Synthetic Data", family: "ai", aliases: ["ctgan", "synthetic data", "synthetic records", "tabular gan"], related: ["generative-ai", "knowledge-systems", "agentic-systems"] },
  { id: "federated-learning", label: "Federated and Swarm Learning", family: "ai", aliases: ["swarm learning", "federated learning", "transfer learning", "decentralized learning"] },
  { id: "mlops", label: "MLOps", family: "ai", aliases: ["mlops", "model ops", "model deployment", "feature store"] },
  { id: "agentic-systems", label: "Agentic Systems", family: "ai", aliases: ["ai agent", "agentic", "multi-agent", "mcp", "tool use"] },
  { id: "knowledge-systems", label: "Knowledge Systems", family: "ai", aliases: ["ontology", "knowledge graph", "knowledge layer", "governed knowledge"] },
  { id: "process-automation", label: "Process Automation", family: "automation", aliases: ["rpa", "robotic process automation", "workflow automation", "desktop robotics", "coe"] },
  { id: "rules-engines", label: "Rules Engines", family: "automation", aliases: ["rules engine", "business rules"] },
  { id: "software-engineering", label: "Software Engineering", family: "engineering", aliases: ["software engineer", "developer", "application development", "full stack"] },
  { id: "technical-architecture", label: "Technical Architecture", family: "engineering", aliases: ["solution architecture", "system architecture", "application architecture", "technical design"] },
  { id: "cloud-platforms", label: "Cloud Platforms", family: "engineering", aliases: ["cloud", "aws", "azure", "gcp", "saas"] },
  { id: "java-ee", label: "Java Enterprise", family: "engineering", aliases: ["java", "java ee", "spring", "j2ee"] },
  { id: "web-development", label: "Web Development", family: "engineering", aliases: ["web development", "frontend", "backend", "full-stack", "angularjs"] },
  { id: "mechanical-engineering", label: "Mechanical Engineering", family: "engineering", aliases: ["mechanical engineer", "mechanical design", "hvac design", "thermodynamics"] },
  { id: "electrical-engineering", label: "Electrical Engineering", family: "engineering", aliases: ["electrical engineer", "power systems", "circuit design", "controls engineer"] },
  { id: "civil-engineering", label: "Civil Engineering", family: "engineering", aliases: ["civil engineer", "structural engineer", "site civil"] },
  { id: "systems-engineering", label: "Systems Engineering", family: "engineering", aliases: ["systems engineer", "systems integration", "requirements engineering"] },
  { id: "hvac", label: "HVAC", family: "trades", aliases: ["hvac", "heating ventilation", "air conditioning", "refrigeration", "epa 608", "epa-608", "rtu", "chiller"], related: ["facilities", "construction"] },
  { id: "plumbing", label: "Plumbing", family: "trades", aliases: ["plumber", "plumbing", "pipefitter", "pipe fitter"] },
  { id: "electrical-trade", label: "Electrical Trade", family: "trades", aliases: ["electrician", "journeyman electrician", "master electrician", "electrical contractor"] },
  { id: "carpentry", label: "Carpentry", family: "trades", aliases: ["carpenter", "carpentry", "finish carpentry", "framing"] },
  { id: "welding", label: "Welding", family: "trades", aliases: ["welder", "welding", "mig", "tig", "stick welding"] },
  { id: "automotive", label: "Automotive Service", family: "trades", aliases: ["auto mechanic", "automotive technician", "ase certified", "diesel technician"] },
  { id: "construction", label: "Construction", family: "trades", aliases: ["construction", "general contractor", "superintendent", "jobsite", "rough-in"] },
  { id: "accounting", label: "Accounting", family: "finance", aliases: ["accountant", "accounting", "cpa", "gaap", "general ledger", "month end close"], related: ["audit", "financial-planning"] },
  { id: "financial-planning", label: "Financial Planning and Analysis", family: "finance", aliases: ["fp&a", "fpa", "financial planning", "forecasting", "budgeting", "variance analysis"] },
  { id: "audit", label: "Audit", family: "finance", aliases: ["auditor", "internal audit", "external audit", "sox"] },
  { id: "tax", label: "Tax", family: "finance", aliases: ["tax preparer", "tax accountant", "irs", "corporate tax"] },
  { id: "bookkeeping", label: "Bookkeeping", family: "finance", aliases: ["bookkeeper", "bookkeeping", "quickbooks", "accounts payable clerk"] },
  { id: "underwriting", label: "Underwriting", family: "finance", aliases: ["underwriter", "underwriting", "credit risk", "loan underwriting"] },
  { id: "investment-management", label: "Investment Management", family: "finance", aliases: ["portfolio manager", "asset management", "wealth management", "cfa", "registered investment"] },
  { id: "banking", label: "Banking", family: "finance", aliases: ["commercial banking", "retail banking", "credit analyst", "loan officer"] },
  { id: "real-estate-finance", label: "Real Estate Finance", family: "finance", aliases: ["mortgage", "loan origination", "cap rate", "noi", "real estate finance"] },
  { id: "trading", label: "Trading", family: "finance", aliases: ["trader", "proprietary trading", "market making", "equities", "fixed income"] },
  { id: "enterprise-sales", label: "Enterprise Sales", family: "sales", aliases: ["enterprise sales", "b2b sales", "quota", "sales executive", "account executive"] },
  { id: "retail-sales", label: "Retail Sales", family: "sales", aliases: ["retail sales", "sales associate", "floor sales"] },
  { id: "business-development", label: "Business Development", family: "sales", aliases: ["business development", "bizdev", "partnerships", "channel sales"] },
  { id: "account-management", label: "Account Management", family: "sales", aliases: ["account manager", "customer success", "client partner", "relationship manager"] },
  { id: "fundraising", label: "Fundraising", family: "sales", aliases: ["fundraiser", "development officer", "donor", "capital campaign"] },
  { id: "real-estate-sales", label: "Real Estate Sales", family: "sales", aliases: ["realtor", "real estate agent", "broker", "listing agent", "buyers agent", "mls"], related: ["property-management", "real-estate-finance"] },
  { id: "brand-marketing", label: "Brand Marketing", family: "marketing", aliases: ["brand manager", "brand marketing", "brand strategy"] },
  { id: "digital-marketing", label: "Digital Marketing", family: "marketing", aliases: ["digital marketing", "performance marketing", "paid media", "sem", "ppc"] },
  { id: "content-marketing", label: "Content Marketing", family: "marketing", aliases: ["content marketing", "content strategist", "copywriter"] },
  { id: "seo", label: "Search Engine Optimization", family: "marketing", aliases: ["seo", "search engine optimization", "organic search"] },
  { id: "social-media", label: "Social Media", family: "marketing", aliases: ["social media", "community manager", "social strategist"] },
  { id: "acting", label: "Acting", family: "creative", aliases: ["actor", "actress", "acting", "on camera", "stage actor", "sag-aftra", "actors equity"], related: ["directing", "voice-over"] },
  { id: "directing", label: "Directing", family: "creative", aliases: ["director", "stage director", "film director"] },
  { id: "voice-over", label: "Voice Over", family: "creative", aliases: ["voice over", "voiceover", "voice actor", "narration"] },
  { id: "writing", label: "Writing", family: "creative", aliases: ["writer", "screenwriter", "playwright", "journalist", "author"] },
  { id: "graphic-design", label: "Graphic Design", family: "creative", aliases: ["graphic designer", "visual design", "adobe illustrator", "indesign"] },
  { id: "ux-design", label: "UX Design", family: "creative", aliases: ["ux designer", "user experience", "product designer", "ui designer"] },
  { id: "photography", label: "Photography", family: "creative", aliases: ["photographer", "photography", "photojournalist"] },
  { id: "music-performance", label: "Music Performance", family: "creative", aliases: ["musician", "singer", "instrumentalist", "composer", "music director"] },
  { id: "video-production", label: "Video Production", family: "creative", aliases: ["videographer", "video editor", "producer", "cinematographer"] },
  { id: "supply-chain", label: "Supply Chain", family: "operations", aliases: ["supply chain", "procurement", "sourcing", "inventory"] },
  { id: "logistics", label: "Logistics", family: "operations", aliases: ["logistics", "warehouse", "fulfillment", "freight", "dispatch"] },
  { id: "facilities", label: "Facilities", family: "operations", aliases: ["facilities", "building maintenance", "plant operations"] },
  { id: "customer-service", label: "Customer Service", family: "operations", aliases: ["customer service", "call center", "support specialist", "help desk"] },
  { id: "hospitality-ops", label: "Hospitality Operations", family: "operations", aliases: ["hotel operations", "front desk", "food and beverage", "restaurant manager", "housekeeping"] },
  { id: "property-management", label: "Property Management", family: "operations", aliases: ["property manager", "property management", "leasing agent", "cam", "tenant"] },
  { id: "legal-practice", label: "Legal Practice", family: "legal", aliases: ["attorney", "lawyer", "litigation", "counsel", "bar admission"] },
  { id: "compliance", label: "Compliance", family: "legal", aliases: ["compliance", "regulatory", "aml", "kyc", "policy"] },
  { id: "contracts", label: "Contracts", family: "legal", aliases: ["contract negotiation", "contract management", "commercial contracts"] },
  { id: "nursing", label: "Nursing", family: "clinical", aliases: ["rn", "registered nurse", "lpn", "nurse practitioner", "bsn"] },
  { id: "physician-practice", label: "Physician Practice", family: "clinical", aliases: ["physician", "md", "do", "surgeon", "attending"] },
  { id: "allied-health", label: "Allied Health", family: "clinical", aliases: ["physical therapist", "occupational therapist", "radiologic", "respiratory therapist", "paramedic"] },
  { id: "clinical-research", label: "Clinical Research", family: "clinical", aliases: ["clinical research", "crc", "cra", "trial coordinator"] },
  { id: "data-architecture", label: "Data Architecture", family: "data", aliases: ["data infrastructure", "data platform", "data engineering", "etl"] },
  { id: "relational-databases", label: "Relational Databases", family: "data", aliases: ["sql", "rdbms", "db2", "postgres", "mysql", "sql server"] },
  { id: "sap-hana", label: "SAP HANA", family: "data", aliases: ["sap", "sap hana", "hana"] },
  { id: "business-intelligence", label: "Business Intelligence", family: "data", aliases: ["business intelligence", "tableau", "power bi", "looker", "reporting"] },
  { id: "excel-modeling", label: "Spreadsheet Modeling", family: "data", aliases: ["excel", "financial model", "spreadsheet", "google sheets"] },
  { id: "agile-delivery", label: "Agile Delivery", family: "delivery", aliases: ["agile", "scrum", "sprint", "kanban"] },
  { id: "project-management", label: "Project Management", family: "delivery", aliases: ["project manager", "pmp", "project management", "workplan"] },
  { id: "program-management", label: "Program Management", family: "delivery", aliases: ["program manager", "program management", "portfolio management"] },
  { id: "team-building", label: "Team Building", family: "people", aliases: ["hiring", "recruit", "team design", "talent"] },
  { id: "coaching", label: "Coaching", family: "people", aliases: ["coach", "coaching", "executive coach", "life coach", "icf", "athletic coach", "sales coach"], related: ["teaching"] },
  { id: "teaching", label: "Teaching", family: "people", aliases: ["teacher", "instructor", "professor", "curriculum", "classroom"] },
  { id: "counseling", label: "Counseling", family: "people", aliases: ["counselor", "therapist", "lcsw", "mental health"] },
  { id: "human-resources", label: "Human Resources", family: "people", aliases: ["human resources", "hrbp", "people operations", "hr generalist"] },
  { id: "recruiting", label: "Recruiting", family: "people", aliases: ["recruiter", "talent acquisition", "sourcer"] },
  { id: "healthcare-systems", label: "Healthcare Systems", family: "domain", aliases: ["healthcare", "health plan", "payer", "clinical", "tricare", "cms"] },
  { id: "defense-systems", label: "Defense Systems", family: "domain", aliases: ["defense", "department of war", "department of defense", "dod", "federal government", "national defense"] },
  { id: "insurance-operations", label: "Insurance Operations", family: "domain", aliases: ["insurance", "claims", "payer operations"] },
  { id: "order-to-cash", label: "Order to Cash", family: "domain", aliases: ["order to cash", "order-to-cash", "otc", "accounts receivable"] },
  { id: "procure-to-pay", label: "Procure to Pay", family: "domain", aliases: ["procure to pay", "procure-to-pay", "p2p", "accounts payable"] },
  { id: "real-estate", label: "Real Estate", family: "domain", aliases: ["real estate", "residential real estate", "commercial real estate", "cre"] },
  { id: "entertainment", label: "Entertainment", family: "domain", aliases: ["entertainment", "film", "theater", "television", "streaming"] },
  { id: "energy", label: "Energy", family: "domain", aliases: ["energy", "oil and gas", "utilities", "renewables", "power generation"] },
  { id: "education-sector", label: "Education Sector", family: "domain", aliases: ["k-12", "higher education", "university", "school district"] },
  { id: "government", label: "Government", family: "domain", aliases: ["government", "public sector", "municipal", "state agency"] },
  { id: "nonprofit", label: "Nonprofit", family: "domain", aliases: ["nonprofit", "ngo", "501c3", "social impact"] },
  { id: "manufacturing", label: "Manufacturing", family: "domain", aliases: ["manufacturing", "plant", "production line", "lean manufacturing"] },
  { id: "agriculture", label: "Agriculture", family: "domain", aliases: ["agriculture", "farming", "agribusiness"] },
  { id: "sports", label: "Sports", family: "domain", aliases: ["sports", "athletics", "collegiate athletics"] },
  { id: "retail", label: "Retail", family: "domain", aliases: ["retail", "merchandising", "store operations"] },
  { id: "telecommunications", label: "Telecommunications", family: "domain", aliases: ["telecom", "telecommunications", "wireless"] },
];

export function norm(value: string): string {
  return lexNorm(value);
}

export function dottedId(node: SkillNode): string {
  return `${node.family}.${node.id}`;
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
  const hits = firstHit(text, SKILL_NODES, (node) => [node.id.replace(/-/g, " "), node.label, ...node.aliases]);
  hits.sort((a, b) => {
    const fa = FAMILY_ORDER.indexOf(a.family as (typeof FAMILY_ORDER)[number]);
    const fb = FAMILY_ORDER.indexOf(b.family as (typeof FAMILY_ORDER)[number]);
    if (fa !== fb) return fa - fb;
    return a.id.localeCompare(b.id);
  });
  return hits;
}

export function nodeNeedles(node: SkillNode): string[] {
  return [node.id.replace(/-/g, " "), node.label, ...node.aliases];
}

export function roleHitsNode(text: string, node: SkillNode): boolean {
  return nodeNeedles(node).some((needle) => needleHits(text, needle));
}

export function families(): string[] {
  const have = new Set(SKILL_NODES.map((n) => n.family));
  return FAMILY_ORDER.filter((f) => have.has(f));
}
