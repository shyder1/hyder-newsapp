import React from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const ArticleDetailSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack>
      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ py: 2 }}>
          {/* Header Section */}
          <Stack spacing={2}>
            {/* Cover Image Skeleton */}
            <Paper elevation={3}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={400}
                sx={{ borderRadius: 1 }}
              />
            </Paper>

            {/* Title Skeleton */}
            <Skeleton variant="text" width="80%" height={60} />

            {/* Source and Date Skeleton */}
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Skeleton variant="text" width={200} height={40} />
            </Box>

            {/* Content Paragraphs Skeleton */}
            <Stack spacing={4} alignItems="flex-start" sx={{ width: "100%" }}>
              {/* Simulate multiple paragraphs */}
              {[...Array(5)].map((_, index) => (
                <Stack key={index} spacing={1} sx={{ width: "100%" }}>
                  <Skeleton variant="text" width="100%" height={25} />
                  <Skeleton variant="text" width="100%" height={25} />
                  <Skeleton variant="text" width="90%" height={25} />
                  <Skeleton variant="text" width="95%" height={25} />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default ArticleDetailSkeleton;
