import { Container } from "@mui/material";
import SearchBar from "../components/Home/SearchBar";
import NearByAirports from "../components/Home/ NearByAirports";
import LandingPage from "../components/LandingPage";
import FlightsList from "./FlightsList";

const Home = () => {
  const darkMode = true;

  return (
    <Container maxWidth="lg">
      <LandingPage darkMode={darkMode} />
      <SearchBar />
      <NearByAirports />
    </Container>
  );
};

export default Home;
