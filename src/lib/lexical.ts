/** Shared lexical collapse. Word-boundary only. Longest needles first. */

export function norm(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+]+/g, " ").trim();
}

export function padded(value: string): string {
  return ` ${norm(value)} `;
}

export function needleHits(haystack: string, needle: string): boolean {
  const n = norm(needle);
  if (!n) return false;
  const compact = n.replace(/\s+/g, "");
  const h = padded(haystack);
  if (compact.length <= 3) return h.includes(` ${n} `);
  return h.includes(` ${n} `);
}

export function firstHit<T>(
  haystack: string,
  items: T[],
  needlesOf: (item: T) => string[],
): T[] {
  const hits = new Map<string, T>();
  const scored: { item: T; len: number }[] = [];
  for (const item of items) {
    const needles = needlesOf(item)
      .map(norm)
      .filter(Boolean)
      .sort((a, b) => b.length - a.length);
    const hit = needles.find((needle) => needleHits(haystack, needle));
    if (hit) scored.push({ item, len: hit.length });
  }
  scored.sort((a, b) => b.len - a.len);
  for (const row of scored) {
    const key = String((row.item as { id?: string }).id ?? scored.indexOf(row));
    if (!hits.has(key)) hits.set(key, row.item);
  }
  return [...hits.values()];
}
