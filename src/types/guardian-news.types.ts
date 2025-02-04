export interface GuardianArticleFields {}

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  fields: {
    body: string;
    thumbnail: string;
  };
}

export interface GuardianResponse {
  currentPage: number;
  orderBy: string;
  pageSize: number;
  pages: number;
  results: GuardianArticle[];
  startIndex: number;
  status: string;
  total: number;
  userTier: string;
}

export interface GuardianApiResponse {
  response: GuardianResponse;
}

export interface GuardianNewsQueryParams {
  format?: "json" | "xml";
  callback?: string;
  q?: string;
  "query-fields"?: string[];
  section?: string;
  reference?: string;
  "reference-type"?: string;
  tag?: string;
  rights?: "syndicatable" | "subscription-databases";
  ids?: string;
  "production-office"?: string;
  lang?: string;
  "star-rating"?: 1 | 2 | 3 | 4 | 5;
  "from-date"?: string;
  "to-date"?: string;
  "use-date"?:
    | "published"
    | "first-publication"
    | "newspaper-edition"
    | "last-modified";
  page?: number;
  "page-size"?: number;
  "order-by"?: "newest" | "oldest" | "relevance";
  "order-date"?: "published" | "newspaper-edition" | "last-modified";
  "show-fields"?: string;
}
