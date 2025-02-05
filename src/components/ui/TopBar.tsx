import { AppBar } from "@mui/material";
import { Link } from "react-router-dom";
import { paths } from "../../pages/routes";

const TopBar = () => {
  return (
    <AppBar>
      <div className="w-50 h-30 flex row justify-start items-center p-5">
        <Link to="/">
          <div className="flex-col justify-start items-start">
            <h1 className="text-4xl font-semibold font-heading text-white text-left font-serif">
              H-News
            </h1>
          </div>
        </Link>

        <div className="flex row ml-16">
          {Object.entries(paths).map(([key, value]) => (
            <Link
              to={value}
              key={value}
              className="mr-8 no-underline hover:underline decoration-white decoration-2 underline-offset-4 transition-all duration-300"
            >
              {key}
            </Link>
          ))}
        </div>
      </div>
    </AppBar>
  );
};

export default TopBar;
