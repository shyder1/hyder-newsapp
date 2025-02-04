import {
  GuardianArticle,
  GuardianNewsQueryParams,
} from "@/types/guardian-news.types";
import {
  Article,
  CommonApiParams,
  NewsSource,
} from "../../../types/news.types";

import dayjs from "dayjs";

export const parseGuardianArticle = (article: GuardianArticle): Article => ({
  id: article.id,
  title: article.webTitle,
  description: null,
  url: article.webUrl,
  imageUrl: article?.fields?.thumbnail,
  publishedAt: dayjs(article.webPublicationDate).format("MMM D, YYYY"),
  category: article.sectionName,
  content: article?.fields?.body,
  newsSource: NewsSource?.GUARDIAN,
});

export const getGuardianApiQueryParams = (
  commonParams: CommonApiParams
): GuardianNewsQueryParams => {
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
};

export const getSingleGuardianApiQueryParams = (
  id: string
): GuardianNewsQueryParams => {
  const guardianParams: GuardianNewsQueryParams = {
    "show-fields": "body,thumbnail",
    ids: id,
  };

  return guardianParams;
};
