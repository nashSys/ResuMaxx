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
  { id: "fintech", label: "Fintech", axis: "industry", aliases: ["fintech", "reconciliation", "deposit", "erp"] },
  { id: "enterprise-software", label: "Enterprise Software", axis: "industry", aliases: ["enterprise software", "saas", "cloud automation"] },
  { id: "government-contracting", label: "Government Contracting", axis: "industry", aliases: ["federal government", "government contract", "federal contract"] },
  { id: "higher-education", label: "Higher Education", axis: "industry", aliases: ["university", "institute", "educators", "students"] },
  { id: "professional-services", label: "Professional Services", axis: "industry", aliases: ["consulting", "advisory", "services firm"] },
];

export const CULTURE_NODES: AxisNode[] = [
  { id: "engineer-owned", label: "Engineer Owned", axis: "culture", aliases: ["engineer-owned", "engineer owned", "owner operator"] },
  { id: "product-studio", label: "Product Studio", axis: "culture", aliases: ["product studio", "venture studio", "startup studio"] },
  { id: "builder-culture", label: "Builder Culture", axis: "culture", aliases: ["pioneers and builders", "build from scratch", "from the ground up"] },
  { id: "regulated-ops", label: "Regulated Operations", axis: "culture", aliases: ["regulated", "audit", "compliance", "hipaa"] },
  { id: "federal-delivery", label: "Federal Delivery", axis: "culture", aliases: ["government contracts", "federal", "department of war"] },
  { id: "adhocracy", label: "Adhocracy", axis: "culture", aliases: ["experimentation", "incubation", "prototype", "horizon technology"] },
  { id: "operator-room", label: "Operators in the Room", axis: "culture", aliases: ["operators", "scoping call", "same room", "humans working with humans"] },
  { id: "advisory-board", label: "Advisory Board Culture", axis: "culture", aliases: ["advisory board", "industry advisor", "board member"] },
];

export const VALUE_NODES: AxisNode[] = [
  { id: "humans-with-humans", label: "Humans Working With Humans", axis: "value", aliases: ["humans working with humans", "elevate the human condition", "human condition"] },
  { id: "original-ip", label: "Original IP", axis: "value", aliases: ["building ip", "from the ground up", "do not re-package", "original ip"] },
  { id: "inspectable-systems", label: "Inspectable Systems", axis: "value", aliases: ["observability", "attribution", "audit", "coverage", "not a black box"] },
  { id: "data-stays-local", label: "Data Stays Local", axis: "value", aliases: ["without moving raw", "data security", "source data local"] },
  { id: "operator-agency", label: "Operator Agency", axis: "value", aliases: ["operators can both use", "keep humans", "controlled tools"] },
  { id: "talent-density", label: "Talent Density", axis: "value", aliases: ["elite technologists", "recruiting exceptional talent", "hired the technical team"] },
  { id: "measurable-outcomes", label: "Measurable Outcomes", axis: "value", aliases: ["measurable business outcomes", "specific, measurable"] },
  { id: "trust", label: "Trust", axis: "value", aliases: ["future of trust", "trust"] },
];

export const INTEREST_NODES: AxisNode[] = [
  { id: "knowledge-infrastructure", label: "Knowledge Infrastructure", axis: "interest", aliases: ["knowledge layer", "ontology", "sublim", "governed knowledge"] },
  { id: "generative-systems", label: "Generative Systems", axis: "interest", aliases: ["generative technology", "generative ai", "ctgan"] },
  { id: "defense-healthcare", label: "Defense Healthcare", axis: "interest", aliases: ["national defense healthcare", "tricare", "department of war"] },
  { id: "product-studios", label: "Product Studios", axis: "interest", aliases: ["product studio", "venture studio", "eight companies"] },
  { id: "tools-for-thought", label: "Tools for Thought", axis: "interest", aliases: ["book-machines", "answer any question", "machines"] },
  { id: "industry-inefficiency", label: "Industry Inefficiency", axis: "interest", aliases: ["industry inefficiency", "massive industry problems"] },
  { id: "teaching-operators", label: "Teaching Operators", axis: "interest", aliases: ["advise educators", "students", "industry advisor"] },
  { id: "synthetic-data-markets", label: "Synthetic Data Markets", axis: "interest", aliases: ["synthetic data", "synthetic records"] },
];

export const ALL_AXIS_NODES: AxisNode[] = [
  ...INDUSTRY_NODES,
  ...CULTURE_NODES,
  ...VALUE_NODES,
  ...INTEREST_NODES,
];

function norm(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+]+/g, " ").trim();
}

export function scanAxis(text: string, nodes: AxisNode[]): AxisNode[] {
  const n = norm(text);
  const found = new Map<string, AxisNode>();
  for (const node of nodes) {
    const needles = [node.id, node.label, ...node.aliases].map(norm);
    if (needles.some((needle) => needle.length >= 3 && n.includes(needle))) {
      found.set(node.id, node);
    }
  }
  return [...found.values()];
}

export function scanAllAxes(text: string): Record<AxisId, AxisNode[]> {
  return {
    industry: scanAxis(text, INDUSTRY_NODES),
    culture: scanAxis(text, CULTURE_NODES),
    value: scanAxis(text, VALUE_NODES),
    interest: scanAxis(text, INTEREST_NODES),
  };
}
