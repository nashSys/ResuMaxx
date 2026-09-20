import { firstHit } from "~/lib/lexical";

export type AxisId = "industry" | "culture" | "value" | "interest";

export type AxisNode = {
  id: string;
  label: string;
  axis: AxisId;
  aliases: string[];
};

export const INDUSTRY_NODES: AxisNode[] = [
  { id: "healthcare-payer", label: "Healthcare Payer", axis: "industry", aliases: ["payer", "health plan", "insurance payer", "payor"] },
  { id: "healthcare-provider", label: "Healthcare Provider", axis: "industry", aliases: ["provider", "health system", "hospital", "clinic"] },
  { id: "federal-health", label: "Federal Health Programs", axis: "industry", aliases: ["cms", "tricare", "medicare", "medicaid", "federal health"] },
  { id: "defense", label: "Defense", axis: "industry", aliases: ["defense", "department of war", "department of defense", "dod", "national defense"] },
  { id: "insurance", label: "Insurance", axis: "industry", aliases: ["insurance", "claims", "commercial insurance"] },
  { id: "banking", label: "Banking", axis: "industry", aliases: ["bank", "banking", "credit union"] },
  { id: "capital-markets", label: "Capital Markets", axis: "industry", aliases: ["capital markets", "investment bank", "broker dealer"] },
  { id: "fintech", label: "Fintech", axis: "industry", aliases: ["fintech", "reconciliation", "payments"] },
  { id: "accounting-firms", label: "Accounting Firms", axis: "industry", aliases: ["public accounting", "big four", "cpa firm"] },
  { id: "real-estate", label: "Real Estate", axis: "industry", aliases: ["real estate", "brokerage", "property management firm"] },
  { id: "construction", label: "Construction", axis: "industry", aliases: ["construction", "general contracting", "gc"] },
  { id: "skilled-trades", label: "Skilled Trades", axis: "industry", aliases: ["hvac company", "mechanical contractor", "trade contractor"] },
  { id: "energy", label: "Energy", axis: "industry", aliases: ["energy", "utilities", "oil and gas", "renewables"] },
  { id: "manufacturing", label: "Manufacturing", axis: "industry", aliases: ["manufacturing", "factory", "industrial"] },
  { id: "logistics", label: "Logistics", axis: "industry", aliases: ["logistics", "trucking", "warehousing", "3pl"] },
  { id: "retail", label: "Retail", axis: "industry", aliases: ["retail", "ecommerce", "e-commerce"] },
  { id: "hospitality", label: "Hospitality", axis: "industry", aliases: ["hospitality", "hotel", "restaurant", "food service"] },
  { id: "entertainment", label: "Entertainment", axis: "industry", aliases: ["entertainment", "film", "television", "theater"] },
  { id: "media", label: "Media", axis: "industry", aliases: ["media", "publishing", "newsroom"] },
  { id: "advertising", label: "Advertising", axis: "industry", aliases: ["advertising", "ad agency", "creative agency"] },
  { id: "education", label: "Education", axis: "industry", aliases: ["education", "school", "university", "k-12"] },
  { id: "coaching-services", label: "Coaching Services", axis: "industry", aliases: ["coaching practice", "coaching firm", "executive coaching"] },
  { id: "nonprofit", label: "Nonprofit", axis: "industry", aliases: ["nonprofit", "ngo", "foundation"] },
  { id: "government", label: "Government", axis: "industry", aliases: ["government", "public sector", "municipality"] },
  { id: "legal-services", label: "Legal Services", axis: "industry", aliases: ["law firm", "legal services", "legal department"] },
  { id: "enterprise-software", label: "Enterprise Software", axis: "industry", aliases: ["enterprise software", "saas", "cloud automation"] },
  { id: "professional-services", label: "Professional Services", axis: "industry", aliases: ["consulting", "advisory", "services firm"] },
  { id: "higher-education", label: "Higher Education", axis: "industry", aliases: ["university", "institute", "educators", "college"] },
  { id: "sports", label: "Sports", axis: "industry", aliases: ["sports", "athletics", "league"] },
  { id: "agriculture", label: "Agriculture", axis: "industry", aliases: ["agriculture", "farming", "ag"] },
  { id: "telecommunications", label: "Telecommunications", axis: "industry", aliases: ["telecom", "wireless", "communications"] },
  { id: "government-contracting", label: "Government Contracting", axis: "industry", aliases: ["federal government", "government contract", "federal contract"] },
];

export const CULTURE_NODES: AxisNode[] = [
  { id: "engineer-owned", label: "Engineer Owned", axis: "culture", aliases: ["engineer-owned", "engineer owned", "owner operator"] },
  { id: "product-studio", label: "Product Studio", axis: "culture", aliases: ["product studio", "venture studio", "startup studio"] },
  { id: "builder-culture", label: "Builder Culture", axis: "culture", aliases: ["pioneers and builders", "build from scratch", "from the ground up"] },
  { id: "startup", label: "Startup", axis: "culture", aliases: ["startup", "early stage", "seed stage"] },
  { id: "corporate", label: "Corporate", axis: "culture", aliases: ["corporate", "enterprise culture", "fortune"] },
  { id: "agency", label: "Agency", axis: "culture", aliases: ["agency", "client services shop"] },
  { id: "union", label: "Union", axis: "culture", aliases: ["union", "collective bargaining"] },
  { id: "franchise", label: "Franchise", axis: "culture", aliases: ["franchise", "franchisee", "franchisor"] },
  { id: "nonprofit-culture", label: "Nonprofit Culture", axis: "culture", aliases: ["mission driven", "mission-driven"] },
  { id: "military", label: "Military", axis: "culture", aliases: ["military", "uniformed", "veteran"] },
  { id: "academic", label: "Academic", axis: "culture", aliases: ["academic", "faculty", "tenure"] },
  { id: "regulated-ops", label: "Regulated Operations", axis: "culture", aliases: ["regulated", "audit", "compliance", "hipaa"] },
  { id: "federal-delivery", label: "Federal Delivery", axis: "culture", aliases: ["government contracts", "federal government", "department of war"] },
  { id: "adhocracy", label: "Adhocracy", axis: "culture", aliases: ["experimentation", "incubation", "prototype", "horizon technology"] },
  { id: "operator-room", label: "Operators in the Room", axis: "culture", aliases: ["operators", "scoping call", "same room", "humans working with humans"] },
  { id: "advisory-board", label: "Advisory Board Culture", axis: "culture", aliases: ["advisory board", "industry advisor", "board member"] },
  { id: "remote", label: "Remote", axis: "culture", aliases: ["remote", "distributed team", "work from home"] },
];

export const VALUE_NODES: AxisNode[] = [
  { id: "humans-with-humans", label: "Humans Working With Humans", axis: "value", aliases: ["humans working with humans", "elevate the human condition", "human condition"] },
  { id: "original-ip", label: "Original IP", axis: "value", aliases: ["building ip", "from the ground up", "do not re-package", "original ip"] },
  { id: "inspectable-systems", label: "Inspectable Systems", axis: "value", aliases: ["observability", "attribution", "audit", "coverage", "not a black box"] },
  { id: "data-stays-local", label: "Data Stays Local", axis: "value", aliases: ["without moving raw", "data security", "source data local"] },
  { id: "operator-agency", label: "Operator Agency", axis: "value", aliases: ["operators can both use", "keep humans", "controlled tools"] },
  { id: "talent-density", label: "Talent Density", axis: "value", aliases: ["elite technologists", "recruiting exceptional talent", "hired the technical team"] },
  { id: "measurable-outcomes", label: "Measurable Outcomes", axis: "value", aliases: ["measurable business outcomes", "specific, measurable"] },
  { id: "trust", label: "Trust", axis: "value", aliases: ["future of trust"] },
  { id: "safety", label: "Safety", axis: "value", aliases: ["safety first", "zero harm", "osha"] },
  { id: "craft", label: "Craft", axis: "value", aliases: ["craft", "workmanship", "pride in work"] },
  { id: "service", label: "Service", axis: "value", aliases: ["customer service", "client service", "service excellence"] },
  { id: "equity", label: "Equity", axis: "value", aliases: ["equity", "inclusion", "access"] },
  { id: "stewardship", label: "Stewardship", axis: "value", aliases: ["stewardship", "fiduciary", "caretaker"] },
];

export const INTEREST_NODES: AxisNode[] = [
  { id: "knowledge-infrastructure", label: "Knowledge Infrastructure", axis: "interest", aliases: ["knowledge layer", "ontology", "sublim", "governed knowledge"] },
  { id: "generative-systems", label: "Generative Systems", axis: "interest", aliases: ["generative technology", "generative ai", "ctgan"] },
  { id: "defense-healthcare", label: "Defense Healthcare", axis: "interest", aliases: ["national defense healthcare", "tricare", "department of war"] },
  { id: "product-studios", label: "Product Studios", axis: "interest", aliases: ["product studio", "venture studio", "eight companies"] },
  { id: "synthetic-data-markets", label: "Synthetic Data Markets", axis: "interest", aliases: ["synthetic data", "synthetic records"] },
  { id: "tools-for-thought", label: "Tools for Thought", axis: "interest", aliases: ["book-machines", "answer any question"] },
  { id: "industry-inefficiency", label: "Industry Inefficiency", axis: "interest", aliases: ["industry inefficiency", "massive industry problems"] },
  { id: "teaching-operators", label: "Teaching Operators", axis: "interest", aliases: ["advise educators", "students", "industry advisor"] },
  { id: "performance", label: "Performance", axis: "interest", aliases: ["on stage", "on camera", "live performance"] },
  { id: "built-environment", label: "Built Environment", axis: "interest", aliases: ["buildings", "jobsite", "mechanical systems"] },
  { id: "markets", label: "Markets", axis: "interest", aliases: ["markets", "investing", "deal flow"] },
  { id: "property", label: "Property", axis: "interest", aliases: ["property", "housing", "land"] },
  { id: "human-development", label: "Human Development", axis: "interest", aliases: ["coaching clients", "athlete development", "human potential"] },
];

export const ALL_AXIS_NODES: AxisNode[] = [
  ...INDUSTRY_NODES,
  ...CULTURE_NODES,
  ...VALUE_NODES,
  ...INTEREST_NODES,
];

export function dottedAxis(node: AxisNode): string {
  return `${node.axis}.${node.id}`;
}

export function scanAxis(text: string, nodes: AxisNode[]): AxisNode[] {
  const hits = firstHit(text, nodes, (node) => [node.id.replace(/-/g, " "), node.label, ...node.aliases]);
  hits.sort((a, b) => a.id.localeCompare(b.id));
  return hits;
}

export function scanAllAxes(text: string): Record<AxisId, AxisNode[]> {
  return {
    industry: scanAxis(text, INDUSTRY_NODES),
    culture: scanAxis(text, CULTURE_NODES),
    value: scanAxis(text, VALUE_NODES),
    interest: scanAxis(text, INTEREST_NODES),
  };
}
