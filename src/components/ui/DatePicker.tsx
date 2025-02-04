import React, { useState } from "react";
import { TextField } from "@mui/material";

const DatePicker = ({
  label = "Select Date",
  onChange,
  value,
  fullWidth = true,
  ...props
}) => {
  const [date, setDate] = useState(value || "");

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <TextField
      label={label}
      type="date"
      value={date}
      onChange={handleDateChange}
      fullWidth={fullWidth}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{
        width: "200px",
        border: "1px solid",
        borderColor: "primary",
        borderRadius: "0.5rem",
      }}
      {...props}
    />
  );
};

export default DatePicker;
