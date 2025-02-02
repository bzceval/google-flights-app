import React, { useState } from "react";
import {
  Box,
  Paper,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Autocomplete,
  Grid2,
} from "@mui/material";
import {
  SwapHoriz as SwapHorizIcon,
  Search as SearchIcon,
  FiberManualRecordOutlined as FiberManualRecordOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
  SyncAlt as SyncAltIcon,
  TrendingFlat as TrendingFlatIcon,
  MultipleStop as MultipleStopIcon,
} from "@mui/icons-material";
import PassengerSelector from "./PassengerSelector";
import RoundTrip from "./DateComp/RoundTrip";
import Departure from "./DateComp/Departure";
import { getSearchAirports } from "../../services/api";

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
  const [openAutocomplete, setOpenAutocomplete] = useState(null);

  const theme = useTheme();

  const handleMenuOpen = (event, type) =>
    type === "trip"
      ? setAnchorEl(event.currentTarget)
      : setClassEl(event.currentTarget);

  const handleMenuClose = (option, type) => {
    if (type === "trip") setSelectedOption(option);
    else setSelectedClass(option);
    type === "trip" ? setAnchorEl(null) : setClassEl(null);
  };

  const handleAddFlight = () => {
    if (flights.length < 5) {
      setFlights([...flights, {}]);
    }
  };

  const handleWhereChange = async (e, where) => {
    const value = e.target.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    if (value.length >= 3) {
      setOpenAutocomplete(where);
      try {
        const response = await getSearchAirports(value);
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
  };

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
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 item>
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
        <Grid2 item>
          <PassengerSelector />
        </Grid2>
        <Grid2 item>
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

      <Grid2 container spacing={1} mt={2} mb={4} alignItems="center">
        {flights.map((_, index) => (
          <React.Fragment key={index}>
            <Grid2 item xs={12} sm={5} md={3}>
              <Autocomplete
                open={openAutocomplete === "whereFrom"}
                options={
                  searchAirports?.whereFrom
                    ?.map((airport) => airport.presentation?.suggestionTitle)
                    .flat() || []
                }
                getOptionLabel={(option) => option || ""}
                onInputChange={(e) => handleWhereChange(e, "whereFrom")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    placeholder="Where from?"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <FiberManualRecordOutlinedIcon sx={{ mr: 1 }} />
                      ),
                    }}
                    sx={{
                      borderRadius: 1,
                      color: "#fff",
                      input: { color: "#fff" },
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 2, md: "auto" }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <IconButton sx={{ color: "#fff" }}>
                <SwapHorizIcon />
              </IconButton>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 5, md: 3 }}>
              <Autocomplete
                open={openAutocomplete === "whereTo"}
                options={
                  searchAirports?.whereTo
                    ?.map((airport) => airport.presentation?.suggestionTitle)
                    .flat() || []
                }
                getOptionLabel={(option) => option || ""}
                onInputChange={(e) => handleWhereChange(e, "whereTo")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    placeholder="Where to?"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <LocationOnOutlinedIcon sx={{ mr: 1 }} />,
                    }}
                    sx={{
                      borderRadius: 1,
                      color: "#fff",
                      input: { color: "#fff" },
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 5 }}>
              {selectedOption.label === "Round trip" ? (
                <RoundTrip />
              ) : (
                <Departure />
              )}
            </Grid2>
          </React.Fragment>
        ))}
        {selectedOption.label === "Multi City" && flights.length < 5 && (
          <Grid2 item size={{ xs: 6, sm: 4, md: 2, lg: 1.5 }} my={3}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#8AB4F8",
                borderRadius: "24px",
                textTransform: "capitalize",
                "&:hover": { bgcolor: "#AECBFA" },
              }}
              fullWidth
              onClick={handleAddFlight}
            >
              Add Flight
            </Button>
          </Grid2>
        )}
      </Grid2>

      <Grid2 container justifyContent="center">
        <Grid2 item size={{ xs: 6, sm: 4, md: 2, lg: 1.5 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#8AB4F8",
              borderRadius: "24px",
              textTransform: "capitalize",
              "&:hover": { bgcolor: "#AECBFA" },
            }}
            startIcon={<SearchIcon />}
            fullWidth
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default SearchBar;
