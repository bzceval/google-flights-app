import FlightLight from "../assets/images/flights_light.svg";
import FlightDark from "../assets/images/flights_dark.svg";
import { Box, Typography, useTheme } from "@mui/material";

const LandingPage = ({ darkMode }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        textAlign: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={darkMode ? FlightDark : FlightLight}
        alt="Google Flights"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <Typography
        variant="subtitle1"
        sx={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: { xs: "36px", md: "56px" },
          lineHeight: "64px",
          zIndex: 1,
          color: theme.palette.mainColors.text,
        }}
      >
        Flights
      </Typography>
    </Box>
  );
};

export default LandingPage;
