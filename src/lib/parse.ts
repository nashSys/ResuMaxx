import { scanSkills, type SkillNode } from "~/lib/ontology";
import { parseRange, type Interval } from "~/lib/years";

export type Role = {
  title: string;
  org: string;
  rawDates: string;
  interval?: Interval;
  text: string;
  skills: SkillNode[];
};

export type ParsedResume = {
  name?: string;
  headline?: string;
  location?: string;
  contact: string[];
  roles: Role[];
  leftover: string;
};

const RANGE =
  /((?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+\d{4}|\d{4})\s*[-–—to]+\s*((?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+\d{4}|\d{4}|present|current|now)/i;

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const URL = /https?:\/\/[^\s)]+/gi;
const LINKEDIN = /linkedin\.com\/in\/[^\s)]+/gi;

function splitBlocks(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
}

function firstLineLooksLikeName(line: string): boolean {
  const words = line.trim().split(/\s+/);
  if (words.length < 2 || words.length > 4) return false;
  if (/experience|summary|education|skills|profile/i.test(line)) return false;
  return words.every((w) => /^[A-Z][a-zA-Z.'-]+$/.test(w) || /^[A-Z]{2,}$/.test(w));
}

export function parseResume(text: string): ParsedResume {
  const lines = text.replace(/\r\n/g, "\n").split("\n").map((l) => l.trim());
  const contact = [
    ...new Set([
      ...(text.match(EMAIL) ?? []),
      ...(text.match(LINKEDIN) ?? []),
      ...(text.match(URL) ?? []).filter((u) => !/linkedin\.com\/in\//i.test(u)),
    ]),
  ];

  let name: string | undefined;
  let headline: string | undefined;
  let location: string | undefined;
  for (const line of lines.slice(0, 12)) {
    if (!name && firstLineLooksLikeName(line)) {
      name = line.replace(/\s+/g, " ");
      continue;
    }
    if (!location && /\b(WI|WI,|Wisconsin|United States|Madison|Ohio)\b/i.test(line) && line.length < 80) {
      location = line;
      continue;
    }
    if (!headline && name && line && line !== name && line.length < 140 && !RANGE.test(line)) {
      headline = line;
    }
  }

  const roles: Role[] = [];
  const blocks = splitBlocks(text);
  for (const block of blocks) {
    const rangeMatch = block.match(RANGE);
    if (!rangeMatch) continue;
    const rawDates = `${rangeMatch[1]} - ${rangeMatch[2]}`;
    const interval = parseRange(rawDates);
    const withoutDates = block.replace(RANGE, " ").replace(/\s+/g, " ").trim();
    const parts = withoutDates.split(/\s+[·•|]\s+|\s+at\s+|\s+,\s+/);
    const title = (parts[0] ?? withoutDates).slice(0, 120);
    const org = (parts[1] ?? "").slice(0, 120);
    roles.push({
      title,
      org,
      rawDates,
      interval,
      text: block,
      skills: scanSkills(block),
    });
  }

  return {
    name,
    headline,
    location,
    contact,
    roles,
    leftover: text,
  };
}

export function extraKeywords(text: string, already: Set<string>): string[] {
  const stop = new Set([
    "the", "and", "for", "with", "from", "that", "this", "into", "over", "than",
    "your", "their", "have", "been", "were", "will", "also", "work", "team",
    "company", "business", "using", "across", "including", "present",
  ]);
  const counts = new Map<string, number>();
  const tokens = text.match(/[A-Za-z][A-Za-z0-9+#./-]{2,}/g) ?? [];
  for (const raw of tokens) {
    const t = raw.toLowerCase();
    if (stop.has(t) || already.has(t) || /^\d+$/.test(t)) continue;
    counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .map(([t]) => t);
}
