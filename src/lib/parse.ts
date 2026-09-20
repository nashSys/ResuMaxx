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
  /((?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+\d{4}|\d{4})\s*[-\u2013\u2014to]+\s*((?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+\d{4}|\d{4}|present|current|now)/i;

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const URL = /https?:\/\/[^\s)]+/gi;
const LINKEDIN = /linkedin\.com\/in\/[^\s)]+/gi;
const SECTION = /^(experience|education|advisory|skills|summary|honors|languages|contact)$/i;

function firstLineLooksLikeName(line: string): boolean {
  const words = line.trim().split(/\s+/);
  if (words.length < 2 || words.length > 4) return false;
  if (/experience|summary|education|skills|profile/i.test(line)) return false;
  return words.every((w) => /^[A-Z][a-zA-Z.'-]+$/.test(w) || /^[A-Z]{2,}$/.test(w));
}

function roleKey(role: Role): string {
  return `${role.title}|${role.org}|${role.rawDates}`.toLowerCase();
}

function buildRole(titleRaw: string, orgRaw: string, rawDates: string, text: string): Role {
  const interval = parseRange(rawDates);
  const title = titleRaw.replace(/\s+/g, " ").trim().slice(0, 120);
  const org = orgRaw.replace(/\s+/g, " ").trim().slice(0, 120);
  return {
    title: title || org || "role",
    org: title ? org : "",
    rawDates,
    interval,
    text,
    skills: scanSkills(text),
  };
}

export function parseResume(text: string): ParsedResume {
  const lines = text.replace(/\r\n/g, "\n").split("\n").map((l) => l.trim());
  const contact = [
    ...new Set([
      ...(text.match(EMAIL) ?? []),
      ...(text.match(LINKEDIN) ?? []),
      ...(text.match(URL) ?? []).filter((u) => !/linkedin\.com\/in\//i.test(u)),
    ]),
  ].sort((a, b) => a.localeCompare(b));

  let name: string | undefined;
  let headline: string | undefined;
  let location: string | undefined;
  for (const line of lines.slice(0, 16)) {
    if (!name && firstLineLooksLikeName(line)) {
      name = line.replace(/\s+/g, " ");
      continue;
    }
    if (!location && /\b(WI|Wisconsin|United States|Madison)\b/i.test(line) && line.length < 80) {
      location = line;
      continue;
    }
    if (!headline && name && line && line !== name && line.length < 140 && !RANGE.test(line) && !SECTION.test(line)) {
      headline = line;
    }
  }

  const roles: Role[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const rangeMatch = line.match(RANGE);
    if (!rangeMatch) continue;
    const rawDates = `${rangeMatch[1]} - ${rangeMatch[2]}`;
    const prev = lines[i - 1] ?? "";
    const prev2 = lines[i - 2] ?? "";
    let title = "";
    let org = "";
    if (prev && !RANGE.test(prev) && !SECTION.test(prev)) {
      if (prev2 && !RANGE.test(prev2) && !SECTION.test(prev2) && prev2.length < 80) {
        org = prev2;
        title = prev;
      } else {
        const parts = prev.split(/\s+[\u00b7\u2022|]\s+|\s+at\s+|\s+,\s+/);
        title = parts[0] ?? prev;
        org = parts[1] ?? "";
      }
    } else {
      const withoutDates = line.replace(RANGE, " ").replace(/\s+/g, " ").trim();
      const parts = withoutDates.split(/\s+[\u00b7\u2022|]\s+|\s+at\s+|\s+,\s+/);
      title = parts[0] ?? withoutDates;
      org = parts[1] ?? "";
    }
    const body: string[] = [prev2, prev, line];
    for (let j = i + 1; j < Math.min(lines.length, i + 8); j++) {
      const nxt = lines[j] ?? "";
      if (!nxt || RANGE.test(nxt) || SECTION.test(nxt)) break;
      body.push(nxt);
    }
    const role = buildRole(title, org, rawDates, body.filter(Boolean).join(" "));
    const key = roleKey(role);
    if (seen.has(key)) continue;
    seen.add(key);
    roles.push(role);
  }

  if (!roles.length) {
    const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
    for (const block of blocks) {
      const rangeMatch = block.match(RANGE);
      if (!rangeMatch) continue;
      const rawDates = `${rangeMatch[1]} - ${rangeMatch[2]}`;
      const withoutDates = block.replace(RANGE, " ").replace(/\s+/g, " ").trim();
      const parts = withoutDates.split(/\s+[\u00b7\u2022|]\s+|\s+at\s+|\s+,\s+/);
      const role = buildRole(parts[0] ?? withoutDates, parts[1] ?? "", rawDates, block);
      const key = roleKey(role);
      if (seen.has(key)) continue;
      seen.add(key);
      roles.push(role);
    }
  }

  return { name, headline, location, contact, roles, leftover: text };
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
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 40)
    .map(([t]) => t);
}
