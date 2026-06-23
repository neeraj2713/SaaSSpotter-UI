export type CompetitionLevel = "low" | "medium" | "high";
export type MvpComplexity = "weekend" | "month" | "quarter";
export type SortField = "created_at" | "demand_score";
export type SortOrder = "asc" | "desc";

export interface PainPoint {
  id: string;
  original_post_id: string;
  core_problem: string;
  saas_idea_1: string;
  saas_idea_2: string;
  demand_score: number;
  industry_tag: string;
  industry_tags?: string[];
  cluster_slug?: string | null;
  cluster_label?: string | null;
  source_url: string;
  target_customer?: string | null;
  competition_level?: CompetitionLevel | null;
  mvp_complexity?: MvpComplexity | null;
  monetization_hint?: string | null;
  evidence_quotes?: string[];
  demand_score_rationale?: string[];
  engagement_signal?: string | null;
  created_at: string;
}

export interface PainPointDetail extends PainPoint {
  source_excerpt?: string | null;
  source_subreddit?: string | null;
}

export interface PaginatedPainPoints {
  items: PainPoint[];
  total: number;
  page: number;
  page_size: number;
  has_next: boolean;
}

export interface IndustryTagCount {
  tag: string;
  count: number;
}

export interface IndustryTagsResponse {
  tags: IndustryTagCount[];
}

export interface ClusterCount {
  slug: string;
  label: string;
  count: number;
}

export interface ClustersResponse {
  clusters: ClusterCount[];
}

export interface DigestResponse {
  period_days: number;
  new_count: number;
  top_by_demand: PainPoint[];
  trending: PainPoint[];
  top_clusters: ClusterCount[];
}

export interface StatsResponse {
  last_scrape_at: string | null;
  total_pain_points: number;
}

export interface PainPointScore {
  id: string;
  pain_point_id: string;
  demand_score: number;
  recorded_at: string;
}

export interface AlertWatch {
  id: string;
  user_id: string;
  keywords: string[];
  tags: string[];
  label?: string | null;
  created_at: string;
}

export interface UserVisit {
  last_visited_at: string | null;
}

export interface ApiError {
  detail: string;
}
