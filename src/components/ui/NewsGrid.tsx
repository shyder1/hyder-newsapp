import React, { FC, useState } from "react";
import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NewsArticle } from "@/types";
import NewsCard from "./NewsCard";
import { Article } from "@/types/news.types";

// Sample data with different sized tiles
const gridItems = [
  {
    title: "Large Item",
    description: "This is a large tile that spans multiple columns",
    image: "/api/placeholder/600/400",
    size: "large",
  },
  {
    title: "Medium Item 1",
    description: "A medium-sized tile",
    image: "/api/placeholder/300/200",
    size: "medium",
  },
  {
    title: "Small Item",
    description: "A small tile",
    image: "/api/placeholder/200/150",
    size: "small",
  },
  {
    title: "Medium Item 2",
    description: "Another medium-sized tile",
    image: "/api/placeholder/300/250",
    size: "medium",
  },
  {
    title: "Extra Small Item",
    description: "A very small tile",
    image: "/api/placeholder/150/100",
    size: "extraSmall",
  },
];

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
        justifyContent={"space-between"}
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
