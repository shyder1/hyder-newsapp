import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useRoutes,
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Autocomplete from "./components/Autocomplete";
import NewsCard from "./components/ui/NewsCard";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../src/theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./pages/routes";
import Layout from "./components/ui/Layout";
import Home from "./pages/Home";
import ArticleDetail from "./pages/Article";

function App() {
  useEffect(() => {}, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });
  const routes: any = {
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

  const router = createBrowserRouter([routes]);

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
