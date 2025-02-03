import { Container, useTheme } from "@mui/material";
import SearchBar from "../components/Home/SearchBar";
import NearByAirports from "../components/Home/ NearByAirports";
import LandingPage from "../components/LandingPage";

const Home = () => {
  const darkMode = true;
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <LandingPage darkMode={darkMode} />
      <SearchBar bg={theme.palette.mainColors.secondary} />
      <NearByAirports />
    </Container>
  );
};

export default Home;
