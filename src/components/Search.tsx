import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";

import _ from "lodash";

import { Cancel, Search as SearchIcon } from "@mui/icons-material";

export interface Props {
  setSearch: (value: string) => void;
}

const Search: FC<Props> = ({ setSearch }) => {
  const [searchField, setSearchField] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");

  const search = useCallback(
    _.debounce((phrase: string) => {
      setSearch(phrase);
    }, 1000),
    []
  );

  useEffect(() => {
    search(searchField);
  }, [searchField]);

  return (
    <Stack spacing={2} gap={2}>
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
                <SearchIcon />
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
    </Stack>
  );
};

export default Search;
