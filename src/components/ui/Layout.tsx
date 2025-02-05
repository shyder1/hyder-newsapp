import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box
      className="flex flex-col m-auto"
      sx={{ width: { sx: "98%", md: "94%" } }}
    >
      <TopBar />
      <main className="mt-32">
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
