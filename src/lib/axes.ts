import { firstHit } from "~/lib/lexical";

export type AxisId = "industry" | "culture" | "value" | "interest";

export type AxisNode = {
  id: string;
  label: string;
  axis: AxisId;
  aliases: string[];
};

export const INDUSTRY_NODES: AxisNode[] = [
  { id: "healthcare-payer", label: "Healthcare Payer", axis: "industry", aliases: ["health plan", "insurance payer", "payor"] },
  { id: "healthcare-provider", label: "Healthcare Provider", axis: "industry", aliases: ["health system", "hospital system", "medical clinic"] },
  { id: "federal-health", label: "Federal Health Programs", axis: "industry", aliases: ["tricare", "medicare", "medicaid", "federal health"] },
  { id: "defense", label: "Defense", axis: "industry", aliases: ["defense contractor", "department of defense", "department of war", "national defense"] },
  { id: "insurance", label: "Insurance", axis: "industry", aliases: ["insurance carrier", "commercial insurance", "claims shop"] },
  { id: "banking", label: "Banking", axis: "industry", aliases: ["retail bank", "commercial bank", "credit union"] },
  { id: "capital-markets", label: "Capital Markets", axis: "industry", aliases: ["capital markets", "investment bank", "broker dealer"] },
  { id: "fintech", label: "Fintech", axis: "industry", aliases: ["fintech", "payments company"] },
  { id: "accounting-firms", label: "Accounting Firms", axis: "industry", aliases: ["public accounting", "big four", "cpa firm"] },
  { id: "real-estate", label: "Real Estate", axis: "industry", aliases: ["real estate brokerage", "property management firm"] },
  { id: "construction", label: "Construction", axis: "industry", aliases: ["general contracting", "construction firm"] },
  { id: "skilled-trades", label: "Skilled Trades", axis: "industry", aliases: ["hvac company", "mechanical contractor", "trade contractor"] },
  { id: "energy", label: "Energy", axis: "industry", aliases: ["oil and gas", "utility company", "renewables"] },
  { id: "manufacturing", label: "Manufacturing", axis: "industry", aliases: ["manufacturing plant", "factory floor", "industrial manufacturer"] },
  { id: "logistics", label: "Logistics", axis: "industry", aliases: ["trucking company", "warehousing", "3pl"] },
  { id: "retail", label: "Retail", axis: "industry", aliases: ["retail chain", "ecommerce", "e-commerce"] },
  { id: "hospitality", label: "Hospitality", axis: "industry", aliases: ["hotel group", "restaurant group", "food service"] },
  { id: "entertainment", label: "Entertainment", axis: "industry", aliases: ["film studio", "television network", "theater company"] },
  { id: "media", label: "Media", axis: "industry", aliases: ["newsroom", "publishing house", "media company"] },
  { id: "advertising", label: "Advertising", axis: "industry", aliases: ["ad agency", "creative agency"] },
  { id: "education", label: "Education", axis: "industry", aliases: ["school district", "university system", "k-12"] },
  { id: "coaching-services", label: "Coaching Services", axis: "industry", aliases: ["coaching practice", "coaching firm", "executive coaching"] },
  { id: "nonprofit", label: "Nonprofit", axis: "industry", aliases: ["nonprofit organization", "foundation", "ngo"] },
  { id: "government", label: "Government", axis: "industry", aliases: ["public sector", "municipality", "state government"] },
  { id: "legal-services", label: "Legal Services", axis: "industry", aliases: ["law firm", "legal department"] },
  { id: "enterprise-software", label: "Enterprise Software", axis: "industry", aliases: ["enterprise software", "saas company"] },
  { id: "professional-services", label: "Professional Services", axis: "industry", aliases: ["consulting firm", "advisory firm", "services firm"] },
  { id: "sports", label: "Sports", axis: "industry", aliases: ["sports league", "athletic department"] },
  { id: "agriculture", label: "Agriculture", axis: "industry", aliases: ["agribusiness", "farm operation"] },
  { id: "telecommunications", label: "Telecommunications", axis: "industry", aliases: ["telecom carrier", "wireless carrier"] },
  { id: "government-contracting", label: "Government Contracting", axis: "industry", aliases: ["federal contract", "government contract"] },
  { id: "aviation", label: "Aviation", axis: "industry", aliases: ["airline", "aviation company", "mro"] },
  { id: "automotive-industry", label: "Automotive Industry", axis: "industry", aliases: ["auto dealer", "automotive oem", "dealership"] },
  { id: "pharma", label: "Pharmaceuticals", axis: "industry", aliases: ["pharmaceutical", "biotech", "life sciences"] },
  { id: "beauty", label: "Beauty", axis: "industry", aliases: ["salon", "spa", "beauty brand"] },
  { id: "food-beverage", label: "Food and Beverage", axis: "industry", aliases: ["food and beverage", "qsr", "restaurant group"] },
];

export const CULTURE_NODES: AxisNode[] = [
  { id: "engineer-owned", label: "Engineer Owned", axis: "culture", aliases: ["engineer-owned", "engineer owned", "owner operator"] },
  { id: "product-studio", label: "Product Studio", axis: "culture", aliases: ["product studio", "venture studio", "startup studio"] },
  { id: "builder-culture", label: "Builder Culture", axis: "culture", aliases: ["build from scratch", "from the ground up", "builder culture"] },
  { id: "startup", label: "Startup", axis: "culture", aliases: ["early stage", "seed stage", "startup environment"] },
  { id: "corporate", label: "Corporate", axis: "culture", aliases: ["enterprise culture", "fortune 500", "corporate environment"] },
  { id: "agency", label: "Agency", axis: "culture", aliases: ["agency model", "client services shop"] },
  { id: "union", label: "Union", axis: "culture", aliases: ["union shop", "collective bargaining", "iba"] },
  { id: "franchise", label: "Franchise", axis: "culture", aliases: ["franchisee", "franchisor", "franchise store"] },
  { id: "nonprofit-culture", label: "Nonprofit Culture", axis: "culture", aliases: ["mission driven", "mission-driven"] },
  { id: "military", label: "Military", axis: "culture", aliases: ["uniformed service", "veteran owned", "military culture"] },
  { id: "academic", label: "Academic", axis: "culture", aliases: ["faculty culture", "tenure track", "academic department"] },
  { id: "regulated-ops", label: "Regulated Operations", axis: "culture", aliases: ["regulated industry", "hipaa environment", "sox environment"] },
  { id: "federal-delivery", label: "Federal Delivery", axis: "culture", aliases: ["government contracts", "federal delivery"] },
  { id: "adhocracy", label: "Adhocracy", axis: "culture", aliases: ["experimentation culture", "incubation", "horizon technology"] },
  { id: "operator-room", label: "Operators in the Room", axis: "culture", aliases: ["operators in the room", "scoping call", "humans working with humans"] },
  { id: "advisory-board", label: "Advisory Board Culture", axis: "culture", aliases: ["advisory board", "industry advisor"] },
  { id: "remote", label: "Remote", axis: "culture", aliases: ["distributed team", "work from home", "remote-first"] },
  { id: "family-business", label: "Family Business", axis: "culture", aliases: ["family owned", "family-owned", "multigenerational"] },
  { id: "shop-floor", label: "Shop Floor", axis: "culture", aliases: ["shop floor", "jobsite culture", "in the field"] },
  { id: "studio-floor", label: "Studio Floor", axis: "culture", aliases: ["on set", "rehearsal room", "studio lot"] },
];

export const VALUE_NODES: AxisNode[] = [
  { id: "humans-with-humans", label: "Humans Working With Humans", axis: "value", aliases: ["humans working with humans", "elevate the human condition"] },
  { id: "original-ip", label: "Original IP", axis: "value", aliases: ["building ip", "from the ground up", "original ip"] },
  { id: "inspectable-systems", label: "Inspectable Systems", axis: "value", aliases: ["observability", "not a black box", "inspectable"] },
  { id: "data-stays-local", label: "Data Stays Local", axis: "value", aliases: ["without moving raw", "source data local", "data stays local"] },
  { id: "operator-agency", label: "Operator Agency", axis: "value", aliases: ["operators can both use", "keep humans in control"] },
  { id: "talent-density", label: "Talent Density", axis: "value", aliases: ["elite technologists", "recruiting exceptional talent"] },
  { id: "measurable-outcomes", label: "Measurable Outcomes", axis: "value", aliases: ["measurable business outcomes", "specific measurable"] },
  { id: "trust-building", label: "Trust Building", axis: "value", aliases: ["future of trust", "trust building", "earn trust"] },
  { id: "safety-first", label: "Safety First", axis: "value", aliases: ["safety first", "zero harm", "osha first"] },
  { id: "craftsmanship", label: "Craftsmanship", axis: "value", aliases: ["workmanship", "pride in work", "craftsmanship"] },
  { id: "service-excellence", label: "Service Excellence", axis: "value", aliases: ["service excellence", "client service", "customer first"] },
  { id: "equitable-access", label: "Equitable Access", axis: "value", aliases: ["equitable access", "inclusion", "equal access"] },
  { id: "stewardship", label: "Stewardship", axis: "value", aliases: ["fiduciary duty", "caretaker", "stewardship"] },
  { id: "reliability", label: "Reliability", axis: "value", aliases: ["show up", "on time every time", "dependable"] },
  { id: "continuous-learning", label: "Continuous Learning", axis: "value", aliases: ["continuous learning", "always learning", "stay current"] },
];

export const INTEREST_NODES: AxisNode[] = [
  { id: "knowledge-infrastructure", label: "Knowledge Infrastructure", axis: "interest", aliases: ["knowledge layer", "governed knowledge"] },
  { id: "generative-systems", label: "Generative Systems", axis: "interest", aliases: ["generative technology", "generative systems"] },
  { id: "defense-healthcare", label: "Defense Healthcare", axis: "interest", aliases: ["national defense healthcare", "tricare"] },
  { id: "product-studios", label: "Product Studios", axis: "interest", aliases: ["product studio", "venture studio"] },
  { id: "synthetic-data-markets", label: "Synthetic Data Markets", axis: "interest", aliases: ["synthetic data markets", "synthetic records"] },
  { id: "tools-for-thought", label: "Tools for Thought", axis: "interest", aliases: ["tools for thought", "book-machines"] },
  { id: "industry-inefficiency", label: "Industry Inefficiency", axis: "interest", aliases: ["industry inefficiency", "massive industry problems"] },
  { id: "teaching-operators", label: "Teaching Operators", axis: "interest", aliases: ["advise educators", "teaching operators"] },
  { id: "performance", label: "Performance", axis: "interest", aliases: ["on stage", "on camera", "live performance"] },
  { id: "built-environment", label: "Built Environment", axis: "interest", aliases: ["built environment", "mechanical systems", "jobsite"] },
  { id: "markets", label: "Markets", axis: "interest", aliases: ["deal flow", "capital markets interest"] },
  { id: "property", label: "Property", axis: "interest", aliases: ["housing market", "land development"] },
  { id: "human-development", label: "Human Development", axis: "interest", aliases: ["athlete development", "human potential", "coaching clients"] },
  { id: "making", label: "Making", axis: "interest", aliases: ["making things", "shop projects", "hands on work"] },
  { id: "outdoors", label: "Outdoors", axis: "interest", aliases: ["outdoors", "trail", "conservation"] },
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

export function axisNeedles(node: AxisNode): string[] {
  return [node.label, ...node.aliases];
}

export function scanAxis(text: string, nodes: AxisNode[]): AxisNode[] {
  const hits = firstHit(text, nodes, axisNeedles);
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
