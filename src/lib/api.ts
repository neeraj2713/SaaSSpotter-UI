import type {
  AlertWatch,
  ApiError,
  ClustersResponse,
  DigestResponse,
  IndustryTagsResponse,
  PaginatedPainPoints,
  PainPoint,
  PainPointDetail,
  PainPointScore,
  SortField,
  SortOrder,
  StatsResponse,
  UserVisit,
} from "./types";

function getApiUrl(): string {
  if (typeof window !== "undefined") return "";

  const url = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("API_URL is not configured");
  }
  return url.replace(/\/$/, "");
}

async function parseApiError(res: Response): Promise<string> {
  let message = `HTTP ${res.status}`;
  try {
    const err: ApiError = await res.json();
    if (res.status === 503) {
      message = "We're having trouble loading ideas. Please try again.";
    } else if (err.detail) {
      message = err.detail;
    }
  } catch {
    if (res.status === 503) {
      message = "We're having trouble loading ideas. Please try again.";
    }
  }
  return message;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getApiUrl()}${path}`, init);
  if (!res.ok) {
    throw new Error(await parseApiError(res));
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function getPainPoints(params: {
  page?: number;
  page_size?: number;
  industry_tag?: string;
  cluster?: string;
  q?: string;
  sort?: SortField;
  order?: SortOrder;
  trending?: boolean;
  since?: string;
}): Promise<PaginatedPainPoints> {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.page_size) search.set("page_size", String(params.page_size));
  if (params.industry_tag) search.set("industry_tag", params.industry_tag);
  if (params.cluster) search.set("cluster", params.cluster);
  if (params.q) search.set("q", params.q);
  if (params.sort) search.set("sort", params.sort);
  if (params.order) search.set("order", params.order);
  if (params.trending) search.set("trending", "true");
  if (params.since) search.set("since", params.since);

  return apiFetch(`/api/v1/painpoints?${search}`);
}

export async function getPainPointById(id: string): Promise<PainPointDetail> {
  return apiFetch(`/api/v1/painpoints/${id}`);
}

export async function getPainPointsBatch(ids: string[]): Promise<PainPoint[]> {
  return apiFetch("/api/v1/painpoints/batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
}

export async function getSimilarPainPoints(
  id: string,
  limit = 5,
): Promise<PainPoint[]> {
  return apiFetch(`/api/v1/painpoints/${id}/similar?limit=${limit}`);
}

export async function getIndustryTags(): Promise<IndustryTagsResponse> {
  return apiFetch("/api/v1/industry-tags");
}

export async function getClusters(): Promise<ClustersResponse> {
  return apiFetch("/api/v1/clusters");
}

export async function getDigest(days = 7): Promise<DigestResponse> {
  return apiFetch(`/api/v1/digest?days=${days}`);
}

export async function getStats(): Promise<StatsResponse> {
  return apiFetch("/api/v1/stats");
}

export async function getPainPointScoreHistory(
  id: string,
): Promise<PainPointScore[]> {
  return apiFetch(`/api/v1/painpoints/${id}/score-history`);
}

// Authenticated user API (via Next.js BFF)
export async function getSavedIds(): Promise<string[]> {
  const data = await apiFetch<{ ids: string[] }>("/api/user/saved");
  return data.ids;
}

export async function saveIdea(id: string): Promise<void> {
  await apiFetch(`/api/user/saved/${id}`, { method: "POST" });
}

export async function unsaveIdea(id: string): Promise<void> {
  await apiFetch(`/api/user/saved/${id}`, { method: "DELETE" });
}

export async function getWatches(): Promise<AlertWatch[]> {
  return apiFetch("/api/user/watches");
}

export async function createWatch(body: {
  keywords?: string[];
  tags?: string[];
  label?: string;
}): Promise<AlertWatch> {
  return apiFetch("/api/user/watches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function deleteWatch(id: string): Promise<void> {
  await apiFetch(`/api/user/watches/${id}`, { method: "DELETE" });
}

export async function getUserVisit(): Promise<UserVisit> {
  return apiFetch("/api/user/visit");
}

export async function touchUserVisit(): Promise<UserVisit> {
  return apiFetch("/api/user/visit", { method: "POST" });
}
