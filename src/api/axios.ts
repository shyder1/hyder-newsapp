import {
  GuardianApiResponse,
  GuardianNewsQueryParams,
  NewsApiQueryParams,
  NewsApiResponse,
} from "@/types";
import {
  Article,
  ArticlesResponse,
  CommonApiParams,
  NewsSource,
  NewsSourceUnion,
} from "../types/news.types";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  convertToGuardianApi,
  convertToNewsApi,
  convertToNytApi,
} from "./utils/parsers";

import {
  getSingleGuardianApiQueryParams,
  parseGuardianArticle,
} from "./utils/parsers/guardianNewsParser";

import {
  getSingleNewsApiQueryParams,
  parseNewsApiArticle,
} from "./utils/parsers/newsApiParser";

import {
  NYTApiResponse,
  NytQueryParams,
} from "@/types/newyork-times-news.types";
import { NEWS_CATEGORIES } from "./statis";
import {
  getSingleNytApiQueryParams,
  parseNewyorkTimesArticle,
} from "./utils/parsers/nytTimesParser";

const apiKeys = {
  guardianApiKey: process.env.REACT_APP_GUARDIAN_API_KEY,
  newsApiKey: process.env.REACT_APP_NEWS_API_KEY,
  newyorkTimesApiKey: process.env.REACT_APP_NYT_API_KEY,
};

// Create API configurations
const apiConfigs = {
  news: {
    baseURL: "https://newsapi.org/v2",
    headers: {
      "X-Api-Key": apiKeys.newsApiKey,
    },
  },
  guardian: {
    baseURL: "https://content.guardianapis.com",
    headers: {
      "X-Api-Key": apiKeys.guardianApiKey,
    },
  },
  newyorkTimes: {
    baseURL: "https://api.nytimes.com/svc/search/v2",
  },
};

// Create axios instances for each API
const createApiInstance = (config) => {
  const instance = axios.create({
    ...config,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add any request preprocessing here
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const customError = {
        statusCode: error.response?.status,
        message: error.response?.data?.message || error.message,
        originalError: error,
        timestamp: new Date().toISOString(),
      };

      return Promise.reject(customError);
    }
  );

  return instance;
};

// Create API services
class ApiService {
  private apis: Record<string, AxiosInstance>;

  constructor() {
    // Initialize API instances
    this.apis = {};
    for (const [name, config] of Object.entries(apiConfigs)) {
      this.apis[name] = createApiInstance(config);
    }
  }

  // Generic request method
  async request(apiName, method, endpoint, options = {}) {
    try {
      const api = this.apis[apiName];
      if (!api) {
        throw new Error(`API '${apiName}' not configured`);
      }

      const response = await api.request({
        method,
        url: endpoint,
        ...options,
      });

      return response;
    } catch (error) {
      //   throw error;
    }
  }

  // Convenience methods for different APIs
  news = {
    searchEverything: (
      params: NewsApiQueryParams
    ): Promise<AxiosResponse<NewsApiResponse>> =>
      this.request("news", "GET", "/everything", { params }),
    getById: (id: string): Promise<AxiosResponse<NewsApiResponse>> => {
      const params = getSingleNewsApiQueryParams(id);

      return this.request("news", "GET", "/everything", { params });
    },
  };

  guardian = {
    searchEverything: async (
      params: GuardianNewsQueryParams
    ): Promise<AxiosResponse<GuardianApiResponse>> => {
      const response = await this.request(
        "guardian",
        "GET",
        `/search?api-key=${apiKeys?.guardianApiKey}`,
        { params }
      );
      return response;
    },
    getById: (id: string): Promise<AxiosResponse<GuardianApiResponse>> => {
      const params = getSingleGuardianApiQueryParams(id);

      return this.request(
        "guardian",
        "GET",
        `/search?api-key=${apiKeys?.guardianApiKey}`,
        { params }
      );
    },
  };

  newyorkTimes = {
    searchEverything: async (
      params: NytQueryParams
    ): Promise<AxiosResponse<NYTApiResponse>> => {
      const response = await this.request(
        "newyorkTimes",
        "GET",
        `/articlesearch.json?api-key=${apiKeys?.newyorkTimesApiKey}`,
        { params }
      );
      return response;
    },
    getById: (id: string): Promise<AxiosResponse<NYTApiResponse>> => {
      const params = getSingleNytApiQueryParams(id);

      return this.request(
        "newyorkTimes",
        "GET",
        `/articlesearch.json?api-key=${apiKeys?.newyorkTimesApiKey}`,
        { params }
      );
    },
  };

  async getAllNews(param: CommonApiParams): Promise<ArticlesResponse> {
    try {
      const initialQueryString = NEWS_CATEGORIES.join(" OR ");
      const newsApiParams = convertToNewsApi(param);
      const guardianApiParams = convertToGuardianApi(param);
      const nytimesApiParams = convertToNytApi(param);

      const queryString = param?.q || initialQueryString;

      const apiRequests =
        param?.sources?.length > 0
          ? param?.sources
              ?.map((key) => {
                switch (key) {
                  case NewsSource?.NEWSAPI:
                    return this.news.searchEverything({
                      ...newsApiParams,
                      q: queryString,
                      pageSize: 10,
                    });

                  case NewsSource?.GUARDIAN:
                    return this.guardian.searchEverything({
                      ...guardianApiParams,
                      q: queryString,
                      "page-size": 10,
                    });

                  case NewsSource?.NYT:
                    return this.newyorkTimes?.searchEverything({
                      ...nytimesApiParams,
                      q: queryString,
                    });

                  default:
                    return null;
                }
              })
              .filter(Boolean)
          : [
              this.news.searchEverything({
                ...newsApiParams,
                q: queryString,
                pageSize: 10,
              }),
              this.guardian.searchEverything({
                ...guardianApiParams,
                q: queryString,
                "page-size": 10,
              }),
              this.newyorkTimes?.searchEverything({
                ...nytimesApiParams,
                q: queryString,
              }),
            ];

      const results = await Promise.all(apiRequests);

      const apiResults =
        param?.sources?.length > 0
          ? param?.sources?.reduce((acc, key, index) => {
              acc[key] = results[index];
              return acc;
            }, {})
          : Object.values(NewsSource)?.reduce((acc, key, index) => {
              acc[key] = results[index];
              return acc;
            }, {});

      const newsApiUnified =
        apiResults?.[NewsSource?.NEWSAPI]?.data?.articles?.map((obj) =>
          parseNewsApiArticle(obj)
        ) || [];
      const guardianUnified =
        apiResults?.[NewsSource?.GUARDIAN]?.data?.response?.results?.map(
          (obj) => parseGuardianArticle(obj)
        ) || [];

      const newYorktimesApiUnified =
        apiResults?.[NewsSource?.NYT]?.data?.response?.docs?.map((obj) =>
          parseNewyorkTimesArticle(obj)
        ) || [];

      return {
        articles: [
          ...newsApiUnified,
          ...guardianUnified,
          ...newYorktimesApiUnified,
        ],
        totalResults:
          apiResults?.[NewsSource?.NEWSAPI].data?.totalResults +
          apiResults?.[NewsSource?.GUARDIAN]?.data?.response?.total +
          apiResults?.[NewsSource?.NYT]?.data?.response?.meta?.hits,
        currentPage: 1,
        hasMore:
          apiResults?.[NewsSource?.NEWSAPI]?.data?.totalResults >
            param?.page * 10 ||
          apiResults?.[NewsSource?.GUARDIAN]?.data?.response?.total >
            param?.page * 10 ||
          apiResults?.[NewsSource?.NYT]?.data?.response?.meta.hits >
            param?.page * 10,
      };
    } catch (error) {
      console.error("Error fetching all news:", error);
      throw error;
    }
  }

  async getNewsById(id: string, source: NewsSourceUnion): Promise<Article> {
    try {
      switch (source) {
        case NewsSource.NEWSAPI: {
          const result = await this.news.getById(id);

          const article = result?.data?.articles?.[0];
          return parseNewsApiArticle(article);
        }

        case NewsSource.GUARDIAN: {
          const result = await this.guardian.getById(id);
          const article = result?.data?.response?.results?.[0];
          return parseGuardianArticle(article);
        }

        case NewsSource.NYT: {
          const result = await this.newyorkTimes.getById(id);
          const article = result?.data?.response?.docs?.[0];
          return parseNewyorkTimesArticle(article);
        }

        default:
          throw new Error(`Unsupported news source: ${source}`);
      }
    } catch (error) {
      console.error(`Error fetching article from ${source}:`, error);
      throw error;
    }
  }
}

// Create and export API service instance
const apiService = new ApiService();
export default apiService;
