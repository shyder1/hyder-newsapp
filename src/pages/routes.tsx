import { Navigate, RouteObject } from "react-router-dom";
import Home from "./Home";
import ArticleDetail from "./Article";
import Layout from "../components/ui/Layout";
export const routes: any = {
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
  ],
};

export const paths = {
  Home: "/",
  Search: "/search",
};
