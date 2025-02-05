import "./App.css";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { theme } from "../src/theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./pages/routes";

import { PreferencesProvider } from "./contexts/PreferencesContext";

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

  const router = createBrowserRouter([routes]);

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <PreferencesProvider>
          <RouterProvider router={router} />
        </PreferencesProvider>
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
