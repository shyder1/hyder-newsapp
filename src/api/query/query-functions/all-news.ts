import { useQuery } from "@tanstack/react-query";
import apiService from "../../axios";
import { CommonApiParams, NewsSourceUnion } from "@/types/news.types";

export function useAllNews(params: CommonApiParams) {
  return useQuery({
    queryKey: ["allNews", params],
    queryFn: () =>
      apiService.getAllNews({
        ...params,
      }),
  });
}

export function useSingleNews(
  id: string,
  source: NewsSourceUnion,
  enabled: boolean
) {
  return useQuery({
    queryKey: ["singleNews", { id, source }],
    queryFn: () => apiService.getNewsById(id, source),
    enabled: enabled,
  });
}
