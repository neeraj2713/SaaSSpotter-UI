export interface PainPoint {
  id: string;
  original_post_id: string;
  core_problem: string;
  saas_idea_1: string;
  saas_idea_2: string;
  demand_score: number;
  industry_tag: string;
  source_url: string;
  created_at: string;
}

export interface PaginatedPainPoints {
  items: PainPoint[];
  total: number;
  page: number;
  page_size: number;
  has_next: boolean;
}

export interface ApiError {
  detail: string;
}
