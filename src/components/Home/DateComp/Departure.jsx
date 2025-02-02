import { Box, IconButton, TextField, useTheme } from "@mui/material";
import {
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material";

const Departure = () => {
  const theme = useTheme();
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
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Departure"
        InputProps={{
          startAdornment: <CalendarMonthOutlinedIcon sx={{ mr: 1 }} />,
          endAdornment: (
            <Box display={"flex"}>
              <IconButton>
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton>
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          ),
        }}
        sx={{
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
        }}
      />
    </Box>
  );
};

export default Departure;
