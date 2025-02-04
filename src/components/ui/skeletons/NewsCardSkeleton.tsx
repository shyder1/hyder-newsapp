import {
  Stack,
  Card,
  CardContent,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const NewsCardSkeleton = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div
      style={{
        width: isDesktop ? "32%" : "100%",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          width: "100%",
          height: { xs: "200px", md: "440px" },
        }}
      >
        {/* Image Section */}
        <Stack
          sx={{
            width: { xs: "40%", md: "100%" },
            height: { xs: "200px", md: "240px" },
            position: "relative",
            borderRight: { xs: 1, md: 0 },
            borderBottom: { xs: 0, md: 1 },
            borderColor: "grey.300",
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        </Stack>

        {/* Content Section */}
        <CardContent
          sx={{
            width: { xs: "60%", md: "100%" },
            p: 2,
            "&:last-child": {
              paddingBottom: 2,
            },
          }}
        >
          {/* Title Skeleton */}
          <Skeleton
            variant="text"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              height: { xs: "24px", md: "30px" },
              mb: 1,
            }}
            width="90%"
            animation="wave"
          />
          <Skeleton
            variant="text"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              height: { xs: "24px", md: "30px" },
              mb: 1,
            }}
            width="70%"
            animation="wave"
          />

          {/* Description Skeleton */}
          <Skeleton
            variant="text"
            sx={{
              fontSize: "0.875rem",
              height: "20px",
            }}
            animation="wave"
          />
          <Skeleton
            variant="text"
            sx={{
              fontSize: "0.875rem",
              height: "20px",
            }}
            animation="wave"
          />
          <Skeleton
            variant="text"
            sx={{
              fontSize: "0.875rem",
              height: "20px",
            }}
            width="80%"
            animation="wave"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsCardSkeleton;
