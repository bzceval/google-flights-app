import React, { useState, useRef, useEffect } from "react";
import { Box, Divider, InputAdornment, useTheme } from "@mui/material";
import { CalendarMonthOutlined as CalendarMonthOutlinedIcon } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const RoundTrip = ({ onDate }) => {
  const theme = useTheme();
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const returnDateRef = useRef(null);

  useEffect(() => {
    if (departureDate && returnDateRef.current) {
      returnDateRef.current.focus(); // Focus on return date when departure is selected
    }
  }, [departureDate]);

  const handleDepartureDateChange = (newValue) => {
    setDepartureDate(newValue);
    if (newValue && returnDate) {
      onDate({
        departure: dayjs(newValue).format("YYYY-MM-DD"),
        return: dayjs(returnDate).format("YYYY-MM-DD"),
      });
    }
  };

  const handleReturnDateChange = (newValue) => {
    setReturnDate(newValue);
    if (departureDate && newValue) {
      onDate(
        {
          departure: dayjs(departureDate).format("YYYY-MM-DD"),
          return: dayjs(newValue).format("YYYY-MM-DD"),
        },
        "roundTrip"
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        border: `1px solid ${theme.palette.mainColors.border}`,
        borderRadius: "5px",
        ":hover": {
          border: `1px solid ${theme.palette.mainColors.primary}`,
        },
        transition: "border 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={departureDate}
          onChange={handleDepartureDateChange}
          minDate={dayjs()}
          required
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              placeholder: "Departure",
              sx: {
                borderRadius: 1,
                color: "#fff",
                input: { color: "#fff" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.mainColors.primary,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
                transition: "border 0.3s ease",
              },
              slotProps: {
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthOutlinedIcon sx={{ mr: 1 }} />
                    </InputAdornment>
                  ),
                },
              },
            },
          }}
        />
      </LocalizationProvider>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          bgcolor: theme.palette.mainColors.border,
          height: "35px",
          alignSelf: "center",
        }}
      />

      {/* Return Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={returnDate}
          onChange={handleReturnDateChange}
          minDate={departureDate ? dayjs(departureDate).add(1, "day") : dayjs()} // Ensure return date is after departure date
          required
          ref={returnDateRef}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              placeholder: "Return",
              sx: {
                borderRadius: 1,
                color: "#fff",
                input: { color: "#fff" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.mainColors.primary,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
                transition: "border 0.3s ease",
              },
              slotProps: {
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthOutlinedIcon sx={{ mr: 1 }} />
                    </InputAdornment>
                  ),
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default RoundTrip;
