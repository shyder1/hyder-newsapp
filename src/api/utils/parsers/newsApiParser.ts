import { NewsApiQueryParams, NewsArticle } from "@/types";
import {
  Article,
  CommonApiParams,
  NewsSource,
} from "../../../types/news.types";
import _ from "lodash";
import dayjs from "dayjs";

export const parseNewsApiArticle = (article: NewsArticle): Article => ({
  id: article.title,
  title: article.title,
  description: article.description,
  url: article.url,
  imageUrl: article.urlToImage,
  publishedAt: dayjs(article.publishedAt).format("MMM D, YYYY"),
  category: "news",
  content: article.content,
  newsSource: NewsSource?.NEWSAPI,
});

export const getNewsApiQueryParams = (
  commonParams: CommonApiParams
): NewsApiQueryParams => {
  const newsParams: NewsApiQueryParams = {};

  if (commonParams.q) newsParams.q = commonParams.q;

  if (commonParams.page) newsParams.page = commonParams.page;

  return newsParams;
};

export const getSingleNewsApiQueryParams = (id: string): NewsApiQueryParams => {
  const newsParams: NewsApiQueryParams = {
    q: id,
    searchIn: "title,description",
  };

  return newsParams;
};
