import type { ApiError, PaginatedPainPoints } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl(): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return API_URL;
}

export async function getPainPoints(params: {
  page?: number;
  page_size?: number;
  industry_tag?: string;
}): Promise<PaginatedPainPoints> {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.page_size) search.set("page_size", String(params.page_size));
  if (params.industry_tag) search.set("industry_tag", params.industry_tag);

  const res = await fetch(`${getApiUrl()}/api/v1/painpoints?${search}`);

  if (!res.ok) {
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
    throw new Error(message);
  }

  return res.json();
}
