import React, { useState } from "react";
import {
  Box,
  Paper,
  Button,
  Menu,
  MenuItem,
  useTheme,
  Grid2,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  SyncAlt as SyncAltIcon,
  TrendingFlat as TrendingFlatIcon,
  MultipleStop as MultipleStopIcon,
} from "@mui/icons-material";
import PassengerSelector from "./PassengerSelector";
import { getSearchAirports } from "../../services/api";
import SearchInput from "./SearchInput";

const menuOptions = [
  { label: "Round trip", icon: <SyncAltIcon /> },
  { label: "One way", icon: <TrendingFlatIcon /> },
  { label: "Multi City", icon: <MultipleStopIcon /> },
];

const classOptions = ["Economy", "Premium Economy", "Business", "First"];

const SearchBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [classEl, setClassEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [flights, setFlights] = useState([{}]);
  const [searchAirports, setSearchAirports] = useState({
    whereTo: [],
    whereFrom: [],
  });
  const [selectFlight, setSelectFlight] = useState({
    originSky: [],
    destinationSky: [],
    cabinClass: "economy",
    oneDate: null,
    roundDate: null,
  });
  const [openAutocomplete, setOpenAutocomplete] = useState(null);

  const theme = useTheme();

  const handleMenuOpen = (event, type) =>
    type === "trip"
      ? setAnchorEl(event.currentTarget)
      : setClassEl(event.currentTarget);

  const handleMenuClose = (option, type) => {
    if (type === "trip") {
      setSelectedOption(option);
    } else if (type === "class") {
      const formattedClass = option.toLowerCase().replace(/\s+/g, "-");
      setSelectedClass(option);
      setSelectFlight((prevState) => ({
        ...prevState,
        cabinClass: formattedClass,
      }));
    }
    type === "trip" ? setAnchorEl(null) : setClassEl(null);
  };

  const handleAddFlight = () => {
    if (flights.length < 5) {
      setFlights([...flights, {}]);
    }
  };

  const handleSelectFlight = (params, type) => {
    setSelectFlight((prevState) => {
      const newState = { ...prevState };
      if (type === "whereFrom") {
        newState.originSky = [...newState.originSky, params];
      } else if (type === "whereTo") {
        newState.destinationSky = [...newState.destinationSky, params];
      }
      return newState;
    });
  };

  const handleWhereChange = async (e, where) => {
    const value = e.target.value;
    if (typeof value === "string") {
      const normalizedValue = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      if (normalizedValue.length >= 1) {
        setOpenAutocomplete(where);
        try {
          const response = await getSearchAirports(normalizedValue);
          const airports = response?.data?.data || [];
          setSearchAirports((prev) => ({
            ...prev,
            [where]: airports,
          }));
        } catch (error) {
          console.error("Error fetching airports:", error);
        }
      } else {
        setOpenAutocomplete(null);
        setSearchAirports((prev) => ({
          ...prev,
          isMenuOpen: false,
        }));
      }
    }
  };

  const handleDate = (date) => {
    setSelectFlight((prevState) => ({
      ...prevState,
      oneDate: date,
    }));
  };

  console.log({ selectFlight });

  return (
    <Paper
      sx={{
        padding: "10px 30px",
        position: "relative",
        backgroundColor: theme.palette.mainColors.secondary,
        border: "none",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, .3), 0 4px 8px 3px rgba(0, 0, 0, .15)",
      }}
    >
      {/* HEADER */}
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 item={"true"}>
          <Button
            onClick={(e) => handleMenuOpen(e, "trip")}
            endIcon={<ExpandMoreIcon />}
            sx={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: theme.palette.mainColors.secondaryText,
            }}
          >
            {selectedOption.icon} {selectedOption.label}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {menuOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuClose(option, "trip")}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{
                    color: theme.palette.mainColors.secondaryText,
                    fontSize: ".9rem",
                  }}
                >
                  {option.icon}
                  {option.label}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Grid2>
        <Grid2 item={"true"}>
          <PassengerSelector />
        </Grid2>
        <Grid2 item={"true"}>
          <Button
            onClick={(e) => handleMenuOpen(e, "class")}
            endIcon={<ExpandMoreIcon />}
            sx={{
              color: theme.palette.mainColors.secondaryText,
              textTransform: "capitalize",
            }}
          >
            {selectedClass}
          </Button>
          <Menu
            anchorEl={classEl}
            open={Boolean(classEl)}
            onClose={() => setClassEl(null)}
          >
            {classOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuClose(option, "class")}
                sx={{
                  color: theme.palette.mainColors.secondaryText,
                  fontSize: ".9rem",
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid2>
      </Grid2>

      {/* INPUTS */}
      <Grid2 container spacing={0.5} alignItems="center">
        <SearchInput
          flights={flights}
          openAutocomplete={openAutocomplete}
          searchAirports={searchAirports}
          selectedOption={selectedOption}
          handleWhereChange={handleWhereChange}
          handleAddFlight={handleAddFlight}
          onSelectFlight={handleSelectFlight}
          onDate={handleDate}
        />
      </Grid2>

      <Grid2 container justifyContent="center">
        <Grid2 item={"true"} size={{ xs: 6, sm: 4, md: 2, lg: 1.5 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#8AB4F8",
              borderRadius: "24px",
              textTransform: "capitalize",
              "&:hover": { bgcolor: "#AECBFA" },
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default SearchBar;
