import { Box, Container } from "@mui/material";
import SearchBar from "../components/Home/SearchBar";
import NearByAirports from "../components/Home/ NearByAirports";
import LandingPage from "../components/LandingPage";

const Home = () => {
  const darkMode = true;

  return (
    <Container maxWidth="lg">
      <LandingPage darkMode={darkMode} />
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <SearchBar />
      </Box>

      {/* Nearby Airports */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <NearByAirports />
      </Box>
    </Container>
  );
};

export default Home;
