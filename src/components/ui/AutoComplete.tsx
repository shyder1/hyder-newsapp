import React from "react";
import { Autocomplete, TextField, Chip, Checkbox } from "@mui/material";

const AutocompleteMultiSelect = ({
  label = "Select Options",
  options = [],
  value = [],
  onChange,
  placeholder = "Select Items",
  customColors = {},
  fullWidth = false,
  disabled = false,
  error = false,
  freeSolo = false,
  limitTags = 4,
  filterSelectedOptions = true,
  noOptionsText = "No options",
}) => {
  const normalizedOptions = options.map((option) =>
    typeof option === "object" ? option : { label: option, value: option }
  );

  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      id="tags-outlined"
      options={normalizedOptions}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox style={{ marginRight: 8 }} checked={selected} />
          {typeof option === "string" ? option : option.label}
        </li>
      )}
      isOptionEqualToValue={(option, val) => option.value === val.value}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      limitTags={2}
      noOptionsText={noOptionsText}
      renderTags={(tagValue, getTagProps) =>
        tagValue.length === 0
          ? null
          : tagValue.map((option, index) =>
              index < 2 ? (
                <Chip
                  sx={{
                    height: "28px",
                  }}
                  {...getTagProps({ index })}
                  key={typeof option === "object" ? option.value : option}
                  label={typeof option === "object" ? option.label : option}
                />
              ) : index === 2 ? (
                <Chip
                  key="remainder"
                  sx={{
                    height: "28px",
                    width: "38px",
                  }}
                  {...getTagProps({ index })}
                  label={`+${tagValue.length - 2}`}
                />
              ) : null
            )
      }
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ shrink: false }}
          label=""
          error={error}
          fullWidth={fullWidth}
          InputProps={{
            ...params.InputProps,
            placeholder: value.length === 0 ? placeholder : "",
          }}
          variant="outlined"
          sx={{
            width: "360px",
            "& .MuiOutlinedInput-root": {
              minHeight: "50px",
              // padding: "2px 8px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "0 !important",
              "&::placeholder": {
                opacity: 1,
                color: "#666",
                fontSize: "16px",
              },
            },
            "& .MuiInputLabel-root": {
              display: "none",
            },
          }}
        />
      )}
    />
  );
};

export default AutocompleteMultiSelect;
