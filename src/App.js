import { ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, responsiveFontSizes } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { useMemo } from "react";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

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
      <Container maxWidth="lg">
        <ThemeProvider theme={theme}>
          <AppRouter />
          <CssBaseline />
          <ToastContainer />
        </ThemeProvider>
      </Container>
    </div>
  );
}

export default App;
