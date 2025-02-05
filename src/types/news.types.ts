// Common unified type for both APIs
export interface Article {
  id: string;
  title: string;
  description: string | null;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
  category: string;
  content: string | null;
  newsSource: NewsSourceUnion;
}

export interface ArticlesResponse {
  articles: Article[];
  totalResults: number;
  currentPage: number;
  hasMore: boolean;
}

export interface CommonApiParams {
  q?: string;
  page?: number;
  sort?: "newest" | "oldest" | "relevance";
  from_date?: string;
  to_date?: string;
  sources?: NewsSourceUnion[];
}

export enum NewsSource {
  NEWSAPI = "newsapi",
  GUARDIAN = "guardian",
  NYT = "newyorkTimes",
}

export type NewsSourceUnion =
  | `${NewsSource.NEWSAPI}`
  | `${NewsSource.GUARDIAN}`
  | `${NewsSource.NYT}`;

export interface NewsSourceOption {
  value: NewsSourceUnion;
  label: string;
}
