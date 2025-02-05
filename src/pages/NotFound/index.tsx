import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: isMobile ? "5rem" : "8rem",
            color: "primary.main",
            mb: 2,
          }}
        />

        <Typography
          variant={isMobile ? "h3" : "h2"}
          component="h1"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          404
        </Typography>

        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h2"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: "600px",
            mb: 4,
          }}
        >
          The page you're looking for doesn't exist or has been moved. Please
          check the URL or navigate back to the homepage.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1.1rem",
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
