import Home from "./Home";
import ArticleDetail from "./Article";
import Layout from "../components/ui/Layout";
import SearchFilters from "./SearchFilters";
import { RouteObject } from "react-router-dom";
import NotFound from "./NotFound";

export const routes: RouteObject = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "article/:source/:id", // Dynamic route with id parameter
      element: <ArticleDetail />,
    },
    {
      path: "/search", // Dynamic route with id parameter
      element: <SearchFilters />,
    },
    {
      // This will catch all unmatched routes
      path: "*",
      element: <NotFound />,
    },
  ],
};

export const paths = {
  Home: "/",
  Search: "/search",
};
