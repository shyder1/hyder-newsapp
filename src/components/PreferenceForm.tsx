import { Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AutocompleteMultiSelect from "./ui/AutoComplete";
import Cancel from "@mui/icons-material/Cancel";

const PreferenceForm = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Example options - can be simple array or array of objects
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
    { value: "elderberry", label: "Elderberry" },
  ];

  return (
    <Stack className="w-full h-full p-4 flex-col relative" spacing={2}>
      <Stack>
        <AutocompleteMultiSelect
          label="News Source"
          options={options}
          value={selectedOptions}
          onChange={setSelectedOptions}
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
      <Stack sx={{ mt: 1 }}>
        <AutocompleteMultiSelect
          label="News Source"
          options={options}
          value={selectedOptions}
          onChange={setSelectedOptions}
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
      <Stack>
        <Button
          variant="contained"
          className="absolute bottom-0 mt-32"
          sx={{ position: "absolute", bottom: "8px", right: "8px" }}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default PreferenceForm;
