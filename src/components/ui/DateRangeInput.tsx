import { TextField, Typography, Box } from "@mui/material";
import { useState } from "react";

interface DateRangeProps {
  onDateChange?: (startDate: string, endDate: string) => void;
}

const DateRangeInput = ({ onDateChange }: DateRangeProps) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateDateRange = (start: string, end: string) => {
    if (!start || !end) return true;
    return new Date(start) <= new Date(end);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);

    if (endDate && !validateDateRange(newStartDate, endDate)) {
      setError("Start date cannot be after end date");
    } else {
      setError("");
      onDateChange?.(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);

    if (startDate && !validateDateRange(startDate, newEndDate)) {
      setError("End date cannot be before start date");
    } else {
      setError("");
      onDateChange?.(startDate, newEndDate);
    }
  };

  const commonStyles = {
    width: "200px",
    border: "1px solid",
    borderColor: error ? "error.main" : "primary.main",
    borderRadius: "0.5rem",
  };

  return (
    <div className="flex flex-col justify-start items-start">
      <Box className="flex flex-row justify-start items-center">
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          placeholder="Start Date"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ ...commonStyles, mr: 1 }}
          error={!!error}
        />
        <Typography variant="subtitle2">to</Typography>
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          placeholder="End Date"
          onChange={handleEndDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            ...commonStyles,
            ml: 1,
          }}
          error={!!error}
        />
      </Box>

      <Typography variant="subtitle2" sx={{ color: "error.main" }}>
        {error}
      </Typography>
    </div>
  );
};

export default DateRangeInput;
