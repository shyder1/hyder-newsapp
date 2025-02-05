import React from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import Autocomplete from "../SearchFilters/SearchFilters";
import HomeView from "./Home";

const Home = () => {
  return (
    <Stack>
      <HomeView />
    </Stack>
  );
};

export default Home;
