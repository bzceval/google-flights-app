import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    mainColors: {
      default: "#fff",
      text: "#70757a",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    mainColors: {
      default: "#202124",
      text: "#e8eaed",
    },
  },
});
