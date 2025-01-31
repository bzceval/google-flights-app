import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, responsiveFontSizes } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { useMemo } from "react";
import AppRouter from "./router/AppRouter";

function App() {
  const darkMode = true;
  const theme = useMemo(
    () => responsiveFontSizes(darkMode ? darkTheme : lightTheme),
    [darkMode]
  );
  return (
    <div
      className="App"
      style={{ backgroundColor: theme.palette.mainColors.default }}
    >
      <ThemeProvider theme={theme}>
        <AppRouter />
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
