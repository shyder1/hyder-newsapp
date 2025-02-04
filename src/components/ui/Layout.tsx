import { Cancel, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import UserAvatar from "./Avatar";
import { Link, Outlet } from "react-router-dom";
import { paths } from "../../pages/routes";

const Layout = () => {
  return (
    <div className="flex flex-col w-[90%] m-auto">
      <AppBar>
        <div className="w-50 h-30 flex row justify-between items-center p-5">
          <div className="flex-col justify-start items-start">
            <h1 className="text-4xl font-semibold font-heading text-white text-left">
              News App
            </h1>
            <p className="text-left">Your one stop solution for daily news</p>
          </div>
          <div className="flex row">
            {Object.entries(paths).map(([key, value]) => (
              <Link to={value}>{key}</Link>
            ))}
          </div>
        </div>
      </AppBar>
      <main className="mt-32">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
