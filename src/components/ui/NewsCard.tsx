import { Article } from "@/types/news.types";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Link } from "react-router-dom";
import { NEWS_SOURCES } from "../../api/statis";

interface BaseNewsProps {
  className?: string;
  children?: React.ReactNode;
}

interface Props extends BaseNewsProps {
  news: Article;
}

const NewsCard: React.FC<Props> = ({ news, children, ...props }) => {
  const { title, id, newsSource, description } = news;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Link
      to={`/article/${newsSource}/${encodeURIComponent(id)}`}
      style={{
        width: isDesktop ? "calc(33.3% - 11px)" : "100%",
        textDecoration: "none",
      }}
      replace
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          width: "100%",
          height: { xs: "200px", md: "440px" },
          "&:hover": {
            boxShadow: 6,
          },
          position: "relative",
        }}
      >
        <Box
          className="absolute top-4 left-4 z-30 rounded-lg"
          sx={{
            bgcolor: "primary.main",
            color: "#FFFFFF",
            p: "4px",
            px: "8px",
          }}
        >
          {NEWS_SOURCES[news?.newsSource]}
        </Box>
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
          {news?.imageUrl ? (
            <img
              src={news.imageUrl}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "grey.100",
              }}
            >
              <NewspaperIcon
                sx={{
                  fill: "grey.500",
                  width: "36px",
                  height: "36px",
                }}
              />
            </Stack>
          )}
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
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              height: { xs: "48px", md: "60px" },
              mb: 1,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              height: { xs: "60px", md: "64px" },
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NewsCard;
