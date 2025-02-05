import React, { useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSingleNews } from "../../api/query/query-functions/all-news";
import { isNewsSource } from "../../api/utils/helpers/typeCheckers";
import { NewsSourceUnion } from "../../types/news.types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import parse from "html-react-parser";
import _ from "lodash";
import ArticleDetailSkeleton from "../../components/ui/skeletons/ArticleDetailSkeleton";

const ArticleDetail = () => {
  const { id, source } = useParams();

  // const decodedId = decodeURIComponent(id);
  // Check if source is valid first
  const isValidSource = source ? isNewsSource(source) : false;

  // Now we can safely use source as it's been validated
  const { data, isLoading, isFetching, isError, error } = useSingleNews(
    id,
    source as NewsSourceUnion,
    isValidSource
  );

  useEffect(() => {
    console.log("DATA ARTICLE: ", data);
  }, [data]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const displayBody = useMemo(
    () => (data?.content ? parse(data?.content) : ""),
    [data?.content]
  );

  return (
    <Stack>
      {isFetching ? (
        <ArticleDetailSkeleton />
      ) : (
        <Container maxWidth="lg">
          <Stack spacing={4} sx={{ py: 2 }}>
            {/* Header Section */}
            <Stack spacing={2}>
              {/* Cover Image */}
              <Paper elevation={3}>
                <Box
                  component="img"
                  src={data?.imageUrl}
                  alt={data.title}
                  sx={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              </Paper>

              <Typography variant="h3" component="h1">
                {data.title}
              </Typography>

              <Box className="flex flex-row">
                <Typography variant="h5" sx={{ color: "secondary.main" }}>
                  {`${_.capitalize(data?.newsSource)} | ${data?.publishedAt}`}
                </Typography>
              </Box>

              {/* Main Content and Sidebar */}
              <Stack
                spacing={4}
                alignItems="flex-start"
                sx={{ fontSize: "1.5rem" }}
              >
                {displayBody}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </Stack>
  );
};

export default ArticleDetail;
