import {
  GuardianArticle,
  GuardianNewsQueryParams,
} from "@/types/guardian-news.types";
import { Article, CommonApiParams } from "@/types/news.types";
import { NewsApiQueryParams, NewsArticle } from "@/types/newsapi-types";
import { NytQueryParams, NYTArticle } from "@/types/newyork-times-news.types";

// Response parsers

// Params parser
export const commonToSpecificParsers = {
  toGuardianApi: (commonParams: CommonApiParams): GuardianNewsQueryParams => {
    const guardianParams: GuardianNewsQueryParams = {
      "show-fields": "body,thumbnail",
    };

    if (commonParams.q) guardianParams.q = commonParams.q;

    if (commonParams.page) guardianParams.page = commonParams.page;

    if (commonParams.sort) {
      switch (commonParams.sort) {
        case "newest":
          guardianParams["order-by"] = "newest";
          break;
        case "oldest":
          guardianParams["order-by"] = "oldest";
          break;
        case "relevance":
          guardianParams["order-by"] = "relevance";
          break;
      }
    }

    if (commonParams.from_date)
      guardianParams["from-date"] = commonParams.from_date;
    if (commonParams.to_date) guardianParams["to-date"] = commonParams.to_date;

    return guardianParams;
  },

  toNewsApi: (commonParams: CommonApiParams): NewsApiQueryParams => {
    const newsParams: NewsApiQueryParams = {};

    if (commonParams.q) newsParams.q = commonParams.q;

    if (commonParams.page) newsParams.page = commonParams.page;

    return newsParams;
  },

  toNytApi: (commonParams: CommonApiParams): NytQueryParams => {
    const nytParams: NytQueryParams = {};

    if (commonParams.q) nytParams.q = commonParams.q;

    if (commonParams.page) nytParams.page = commonParams.page;

    if (commonParams.sort) {
      switch (commonParams.sort) {
        case "newest":
        case "oldest":
        case "relevance":
          nytParams.sort = commonParams.sort;
          break;
      }
    }

    if (commonParams.from_date)
      nytParams.begin_date = commonParams.from_date.split("-").join("");
    if (commonParams.to_date)
      nytParams.end_date = commonParams.from_date.split("-").join("");

    return nytParams;
  },
};

export const convertToGuardianApi = (commonParams: CommonApiParams) => {
  return commonToSpecificParsers.toGuardianApi(commonParams);
};

export const convertToNewsApi = (commonParams: CommonApiParams) => {
  return commonToSpecificParsers.toNewsApi(commonParams);
};

export const convertToNytApi = (commonParams: CommonApiParams) => {
  return commonToSpecificParsers.toNytApi(commonParams);
};
