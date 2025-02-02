import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    mainColors: {
      default: "#fff",
      text: "#70757a",
      secondary: "#fff",
      secondaryText: "#70757a",
      btnColor: "#90caf9",
      border: "#dadce0",
      mainBlue: "#1a73e8",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    mainColors: {
      default: "#202124",
      text: "#e8eaed",
      secondary: "#3a3b3f",
      secondaryText: "#9aa0a6",
      btnColor: "#90caf9",
      border: "#5f6368",
      mainBlue: "#8ab4f8",
    },
  },
});
