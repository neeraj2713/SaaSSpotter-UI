const STORAGE_KEY = "saasspotter:compare-ids";
const MAX_COMPARE = 3;

export function getCompareIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setCompareIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_COMPARE)));
  window.dispatchEvent(new Event("compare-ids-changed"));
}

export function toggleCompareId(id: string): string[] {
  const current = getCompareIds();
  if (current.includes(id)) {
    const next = current.filter((x) => x !== id);
    setCompareIds(next);
    return next;
  }
  if (current.length >= MAX_COMPARE) {
    const next = [...current.slice(1), id];
    setCompareIds(next);
    return next;
  }
  const next = [...current, id];
  setCompareIds(next);
  return next;
}

export function isInCompare(id: string): boolean {
  return getCompareIds().includes(id);
}
