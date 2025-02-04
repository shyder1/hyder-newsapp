interface NYTKeyword {
  name: string;
  value: string;
  rank: number;
  major: "N" | "Y";
}

interface NYTMultimedia {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: {
    xlarge?: string;
    xlargewidth?: number;
    xlargeheight?: number;
    thumbnail?: string;
    thumbnailwidth?: number;
    thumbnailheight?: number;
    widewidth?: number;
    wideheight?: number;
    wide?: string;
    [key: string]: any;
  };
  subType: string;
  crop_name: string;
}

export interface NYTHeadline {
  main: string;
  kicker: string | null;
  content_kicker: string | null;
  print_headline: string | null;
  name: string | null;
  seo: string | null;
  sub: string | null;
}

export interface NYTByline {
  original: string;
  person: any[]; // You can expand this if you have the person structure
  organization: string;
}

export interface NYTArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: NYTMultimedia[];
  headline: NYTHeadline;
  keywords: NYTKeyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name?: string;
  byline: NYTByline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface NYTApiResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface NytQueryParams {
  begin_date?: string;
  end_date?: string;
  facet?: "false" | "true";
  facet_fields?:
    | "day_of_week"
    | "document_type"
    | "ingredients"
    | "news_desk"
    | "pub_month"
    | "pub_year"
    | "section_name"
    | "source"
    | "subsection_name"
    | "type_of_material";
  facet_filter?: "false" | "true";
  fl?: string;
  fq?: string;
  page?: number;
  q?: string;
  sort?: "newest" | "oldest" | "relevance";
}
