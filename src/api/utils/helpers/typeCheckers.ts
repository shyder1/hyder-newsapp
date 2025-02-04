import { NewsSource, NewsSourceUnion } from "../../../types/news.types";

export const isNewsSource = (value: string): value is NewsSourceUnion => {
  return Object.values(NewsSource).includes(value as NewsSource);
};
