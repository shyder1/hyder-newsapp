import { NewsSourceOption } from "@/types/news.types";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  Button,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import Filters from "./Filters";
import { Clear } from "@mui/icons-material";

export interface Props {
  variant: "preference" | "filters";
  setStartDate?: (value: string) => void;
  setEndDate?: (value: string) => void;
  categories?: AutocompleteOption[];
  setCategories?: (value: Array<AutocompleteOption>) => void;
  sources?: NewsSourceOption[];
  setSources?: (value: Array<NewsSourceOption>) => void;
}

const FilterAction: FC<Props> = ({ ...props }) => {
  const [openPreferencesModal, setOpenPreferencesModal] = useState(false);

  // Open dropdown menu
  const handleFilterClick = (event) => {
    setOpenPreferencesModal((val) => !val);
  };

  const handleFilterClose = (event) => {
    setOpenPreferencesModal(false);
  };
  return (
    <Box className="relative">
      <Button
        onClick={handleFilterClick}
        sx={{
          cursor: "pointer",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <FilterAltIcon />
        Filter
      </Button>

      {openPreferencesModal ? (
        <Box
          className="absolute z-50 top-12 bg-white p-4 rounded-xl transform transition-all duration-300 ease-in-out"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
          }}
        >
          <Box className="flex flex-row justify-between w-full">
            <Typography variant="h5" sx={{ color: "primary.main", mb: 1 }}>
              Filter by:
            </Typography>
            <IconButton onClick={handleFilterClose} sx={{ mb: 2 }}>
              <Clear />
            </IconButton>
          </Box>

          <Filters {...props} variant="filters" {...props} />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default FilterAction;
