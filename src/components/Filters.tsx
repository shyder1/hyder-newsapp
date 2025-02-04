import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import DatePicker from "./ui/DatePicker";
import CustomSelect from "./ui/Select";
import { NEWS_CATEGORIES, NEWS_SOURCES } from "../api/statis";
import AutocompleteMultiSelect from "./ui/AutoComplete";
import _ from "lodash";
import DateRangeInput from "./ui/DateRangeInput";
import { Cancel, Search } from "@mui/icons-material";

export interface Props {
  variant: "preference" | "filters";
  setStartDate?: (value: string) => void;
  setEndDate?: (value: string) => void;
  setSearch?: (value: string) => void;
  categories?: { value: string; label: string }[];
  setCategories?: (value: Array<{ value: string; label: string }>) => void;
  sources?: { value: string; label: string }[];
  setSources?: (value: Array<{ value: string; label: string }>) => void;
}

const Filters: FC<Props> = ({
  setStartDate,
  setEndDate,
  setCategories,
  setSources,
  categories,
  sources,
}) => {
  const categoryOptions = [
    ...NEWS_CATEGORIES.map((obj) => ({
      value: obj,
      label: _.capitalize(obj),
    })),
  ];

  const newsSourcesOptions = Object.entries(NEWS_SOURCES).map(
    ([key, value]) => ({ value: key, label: value })
  );

  const [selectedOptions, setSelectedOptions] = useState([categoryOptions[0]]);

  const [searchField, setSearchField] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");

  const search = useCallback(
    _.debounce((phrase: string) => {
      setSearchPhrase(phrase);
    }, 1000),
    []
  );

  useEffect(() => {
    search(searchField);
  }, [searchField]);

  return (
    <Box className="flex flex-row justify-between items-between w-full">
      <Box className="flex flex-row">
        <Stack className="justify-start items-start">
          <Typography variant="h6">Date</Typography>
          {/* <DatePicker
          value={""}
          label="Choose Date"
          onChange={(e) => console.log(e)}
        /> */}
          <DateRangeInput
            onDateChange={(a, b) => {
              setStartDate(a);
              setEndDate(b);
            }}
          />
        </Stack>
        <Stack className="justify-start items-start ml-4">
          <Typography variant="h6">Categories</Typography>
          <AutocompleteMultiSelect
            label="Categories"
            options={categoryOptions}
            value={categories}
            onChange={(values) => {
              const unique = _.uniqBy(values, "value");
              setCategories([...unique]);
            }}
            placeholder="Select Categories"
            customColors={{
              hoverBorder: "#ff4400",
              focusBorder: "#ff4400",
              chipBackground: "#ff4400",
              chipColor: "white",
            }}
            fullWidth
          />
        </Stack>
        <Stack className="justify-start items-start ml-4">
          <Typography variant="h6">Sources</Typography>
          <AutocompleteMultiSelect
            label="News Source"
            options={newsSourcesOptions}
            value={sources}
            onChange={(values) => {
              const unique = _.uniqBy(values, "value");
              setSources([...unique]);
            }}
            placeholder="Select News Source"
            customColors={{
              hoverBorder: "#ff4400",
              focusBorder: "#ff4400",
              chipBackground: "#ff4400",
              chipColor: "white",
            }}
            fullWidth
          />
        </Stack>
      </Box>
      <TextField
        label="Standard Search"
        variant="outlined"
        fullWidth
        value={searchField}
        placeholder="Search News..."
        onChange={(e) => setSearchField(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchPhrase && (
              <InputAdornment position="end" sx={{ pr: "8px" }}>
                <IconButton onClick={() => setSearchField("")} edge="end">
                  <Cancel />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          width: "300px",
          mt: 2.75,
          border: "1px solid",
          borderColor: "primary.main",
          height: "50px",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

export default Filters;
