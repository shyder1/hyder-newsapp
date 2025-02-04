import { Box, Stack } from "@mui/material";
import NewsCardSkeleton from "./NewsCardSkeleton";

const NewsSkeletonGrid = () => {
  // Create an array of 6 items to show skeleton placeholders
  const skeletonCount = 6;
  const skeletons = Array.from({ length: skeletonCount });

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
        justifyContent="space-between"
      >
        {skeletons.map((_, index) => (
          <NewsCardSkeleton key={`skeleton-${index}`} />
        ))}
      </Stack>
    </Box>
  );
};

export default NewsSkeletonGrid;
