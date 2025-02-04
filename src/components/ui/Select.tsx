import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

// Custom Select Component
interface CustomSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Array<{ value: string; label: string }>;
}

const CustomSelect = ({ value, onChange, options }: CustomSelectProps) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 300,
            "& .MuiMenuItem-root": {
              padding: "8px 16px",
            },
          },
        },
      }}
      sx={{ width: "100px", border: "1px solid", borderColor: "primary" }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
