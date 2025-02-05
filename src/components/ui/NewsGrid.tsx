import { FC } from "react";
import { Stack, Box } from "@mui/material";

import NewsCard from "./NewsCard";
import { Article } from "@/types/news.types";

interface Props {
  newsList: Article[];
}

const NewsGrid: FC<Props> = ({ newsList }) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        flex={1}
        justifyContent={"start"}
        gap={"16px"}
      >
        {newsList?.map((newsArticle, index) => (
          <NewsCard news={newsArticle} key={newsArticle?.id} />
        ))}
      </Stack>
    </Box>
  );
};

export default NewsGrid;
