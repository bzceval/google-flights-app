import { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlightLight from "../assets/images/flights_light.svg";
import FlightDark from "../assets/images/flights_dark.svg";

const LandingPage = ({ darkMode }) => {
  const theme = useTheme();

  const imageSrc = useMemo(
    () => (darkMode ? FlightDark : FlightLight),
    [darkMode]
  );

  const textStyle = useMemo(
    () => ({
      position: "absolute",
      top: "70%",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: { xs: "36px", md: "56px" },
      lineHeight: "64px",
      zIndex: 1,
      color: theme.palette.mainColors.text,
    }),
    [theme.palette.mainColors.text]
  );

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
        src={imageSrc}
        alt="Google Flights"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <Typography data-test="landing-text" variant="subtitle1" sx={textStyle}>
        Flights
      </Typography>
    </Box>
  );
};

export default LandingPage;
