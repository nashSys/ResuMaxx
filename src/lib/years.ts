export type Interval = { start: Date; end: Date };

export function presentDate(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

export function utcMonth(year: number, monthIndex: number): Date {
  return new Date(Date.UTC(year, monthIndex, 1));
}

export function parseMonthYear(raw: string): Date | undefined {
  const t = raw.trim().toLowerCase();
  if (/^(present|current|now|today)$/.test(t)) return presentDate();
  const monthMap: Record<string, number> = {
    jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2,
    apr: 3, april: 3, may: 4, jun: 5, june: 5, jul: 6, july: 6,
    aug: 7, august: 7, sep: 8, sept: 8, september: 8,
    oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
  };
  const m = t.match(/^([a-z]+)?\s*(\d{4})$/);
  if (m) {
    const month = m[1] ? monthMap[m[1]] : 0;
    if (month === undefined) return undefined;
    return utcMonth(Number(m[2]), month);
  }
  const iso = t.match(/^(\d{4})-(\d{2})(?:-\d{2})?$/);
  if (iso) return utcMonth(Number(iso[1]), Number(iso[2]) - 1);
  return undefined;
}

export function parseRange(raw: string): Interval | undefined {
  const cleaned = raw.replace(/[–—]/g, "-").replace(/\s+to\s+/gi, "-");
  const parts = cleaned.split(/\s*-\s*/);
  if (parts.length < 2) return undefined;
  const start = parseMonthYear(parts[0] ?? "");
  const end = parseMonthYear(parts.slice(1).join("-"));
  if (!start || !end) return undefined;
  if (end < start) return { start: end, end: start };
  return { start, end };
}

export function yearsOf(interval: Interval): number {
  const ms = interval.end.getTime() - interval.start.getTime();
  return Math.max(0, ms / (1000 * 60 * 60 * 24 * 365.25));
}

export function mergeIntervals(input: Interval[]): Interval[] {
  const sorted = [...input].sort((a, b) => a.start.getTime() - b.start.getTime());
  const out: Interval[] = [];
  for (const cur of sorted) {
    const last = out[out.length - 1];
    if (!last || cur.start.getTime() > last.end.getTime()) {
      out.push({ start: new Date(cur.start), end: new Date(cur.end) });
      continue;
    }
    if (cur.end > last.end) last.end = new Date(cur.end);
  }
  return out;
}

export function coveredYears(input: Interval[]): number {
  return mergeIntervals(input).reduce((sum, i) => sum + yearsOf(i), 0);
}

export function roundYears(n: number): number {
  return Math.round(n * 10) / 10;
}
