import React, { useState, useCallback, useMemo } from "react";
import { Box, IconButton, InputAdornment, useTheme } from "@mui/material";
import { CalendarMonthOutlined as CalendarMonthOutlinedIcon } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const SelectDateComp = ({ onSelectDate }) => {
  const theme = useTheme();
  const [departureDate, setDepartureDate] = useState(null);

  const handleDateChange = useCallback(
    (newValue) => {
      setDepartureDate(newValue);
      if (newValue) {
        onSelectDate(dayjs(newValue).format("YYYY-MM-DD"));
      }
    },
    [onSelectDate]
  );

  const textFieldProps = useMemo(
    () => ({
      fullWidth: true,
      variant: "outlined",
      placeholder: "Departure",
      sx: {
        borderRadius: 1,
        color: "#fff",
        input: { color: "#fff" },
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.mainColors.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        transition: "border 0.3s ease",
      },
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <CalendarMonthOutlinedIcon sx={{ mr: 1 }} />
            </IconButton>
          </InputAdornment>
        ),
      },
    }),
    [theme]
  );

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
          onChange={handleDateChange}
          minDate={dayjs()}
          format="ddd, MMM DD"
          slotProps={{ textField: textFieldProps }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default React.memo(SelectDateComp);
