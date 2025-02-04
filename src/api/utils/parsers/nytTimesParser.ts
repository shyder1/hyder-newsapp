import {
  Article,
  CommonApiParams,
  NewsSource,
} from "../../../types/news.types";
import { NYTArticle, NytQueryParams } from "@/types/newyork-times-news.types";
import dayjs from "dayjs";

export const parseNewyorkTimesArticle = (nytArticle: NYTArticle): Article => {
  // Find the best quality image
  const bestImage =
    nytArticle.multimedia.find(
      (media) => media.type === "image" && media.subtype === "superJumbo"
    )?.url || null;

  return {
    id: nytArticle.web_url.split("://")[1],
    title: nytArticle.headline.main,
    description: nytArticle.abstract,
    url: nytArticle.web_url,
    imageUrl: nytArticle?.multimedia[0]
      ? `https://www.nytimes.com/${nytArticle?.multimedia[0]?.url}`
      : "",
    publishedAt: dayjs(nytArticle.pub_date).format("MMM D, YYYY"),
    category: nytArticle.news_desk,
    content: nytArticle.lead_paragraph,
    newsSource: NewsSource?.NYT,
  };
};

export const getNytApiQueryParams = (
  commonParams: CommonApiParams
): NytQueryParams => {
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
};

export const getSingleNytApiQueryParams = (id: string): NytQueryParams => {
  const nytParams: NytQueryParams = {
    q: id,
  };

  return nytParams;
};
