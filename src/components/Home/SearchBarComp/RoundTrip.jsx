import { Box, Divider, TextField, useTheme } from "@mui/material";
import { CalendarMonthOutlined as CalendarMonthOutlinedIcon } from "@mui/icons-material";

const RoundTrip = () => {
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
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          bgcolor: theme.palette.mainColors.border,
          height: "35px",
          alignSelf: "center",
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Return"
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

export default RoundTrip;
