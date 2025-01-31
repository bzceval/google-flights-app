import { Grid2, Typography, useTheme } from "@mui/material";
import FlightLight from "../assets/images/flights_light.svg";
import FlightDark from "../assets/images/flights_dark.svg";
import SearchBar from "../components/Home/SearchBar";
import NearByAirports from "../components/Home/ NearByAirports";

const Home = () => {
  const darkMode = true;
  const theme = useTheme();
  return (
    <Grid2
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid2
        size={{ xs: 12, md: 7 }}
        sx={{ position: "relative", textAlign: "center" }}
      >
        <img src={darkMode ? FlightDark : FlightLight} alt="Google Flights" />
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
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}>
        <SearchBar />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}>
        <NearByAirports />
      </Grid2>
    </Grid2>
  );
};

export default Home;
