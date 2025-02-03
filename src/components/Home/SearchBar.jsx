import React, { useCallback, useState } from "react";
import { Box, Button, Menu, MenuItem, useTheme, Grid2 } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  SyncAlt as SyncAltIcon,
  TrendingFlat as TrendingFlatIcon,
  MultipleStop as MultipleStopIcon,
} from "@mui/icons-material";
import PassengerSelector from "./PassengerSelector";
import { getSearchAirports, getSearchFlights } from "../../services/api";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";
import { ErrorDialog } from "../../helper";

const menuOptions = [
  { label: "One way", icon: <TrendingFlatIcon /> },
  { label: "Round trip", icon: <SyncAltIcon /> },
  { label: "Multi City", icon: <MultipleStopIcon /> },
];

const classOptions = ["Economy", "Premium Economy", "Business", "First"];

const SearchBar = ({ bg }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [classEl, setClassEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [searchAirports, setSearchAirports] = useState({
    whereTo: [],
    whereFrom: [],
  });
  const [selectFlight, setSelectFlight] = useState({
    originSky: [],
    destinationSky: [],
    cabinClass: "economy",
    oneDate: null,
    passenger: {
      adults: 1,
    },
  });
  const [openAutocomplete, setOpenAutocomplete] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleMenuOpen = (event, type) =>
    type === "trip"
      ? setAnchorEl(event.currentTarget)
      : setClassEl(event.currentTarget);

  const handleMenuClose = (option, type) => {
    if (type === "trip") {
      setSelectedOption(option);
    } else if (type === "class") {
      const formattedClass = option.toLowerCase().replace(/\s+/g, "_");
      setSelectedClass(option);
      setSelectFlight((prevState) => ({
        ...prevState,
        cabinClass: formattedClass,
      }));
    }
    type === "trip" ? setAnchorEl(null) : setClassEl(null);
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
          ErrorDialog(error);
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

  const handleSelectAdults = (adults) => {
    setSelectFlight((prevState) => ({
      ...prevState,
      adults: adults,
    }));
  };

  const handleSelectDate = (date) => {
    setSelectFlight((prevState) => ({
      ...prevState,
      oneDate: date,
    }));
  };

  const isFormValid = useCallback(() => {
    return (
      selectFlight.originSky.length > 0 &&
      selectFlight.destinationSky.length > 0 &&
      selectFlight.oneDate !== null &&
      selectFlight.passenger.adults > 0
    );
  }, [selectFlight]);

  const fetchData = useCallback(async () => {
    if (!isFormValid()) {
      ErrorDialog("Please fill in the relevant inputs!");
    }
    try {
      const response = await getSearchFlights(selectFlight);
      navigate("/flights", { state: { flightData: response.data } });
      console.log(response.data);
    } catch (error) {
      ErrorDialog(error);
    }
  }, [navigate, selectFlight, isFormValid]);

  return (
    <Grid2
      size={12}
      item="true"
      my={5}
      sx={{
        padding: { xs: "10px", sm: "10px 30px" },
        borderRadius: "8px",
        position: "relative",
        backgroundColor: { xs: "none", sm: bg },
        width: "100%",
        boxShadow: {
          xs: "none",
          sm: "0 1px 3px 0 rgba(0, 0, 0, .3), 0 4px 8px 3px rgba(0, 0, 0, .15)",
        },
        transition: "background-color 0.3s ease",
      }}
    >
      {/* HEADER */}
      <Grid2
        container
        spacing={2}
        alignItems="center"
        direction="row"
        wrap="nowrap"
      >
        <Grid2 item="true" size={{ xs: 4, sm: "auto" }}>
          <Button
            onClick={(e) => handleMenuOpen(e, "trip")}
            endIcon={<ExpandMoreIcon />}
            sx={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: theme.palette.mainColors.text,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Box
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {selectedOption.icon} {selectedOption.label}
            </Box>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {menuOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={() =>
                  option.label === "One way" && handleMenuClose(option, "trip")
                }
                disabled={option.label !== "One way"}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{
                    color:
                      option.label === "One way"
                        ? theme.palette.mainColors.text
                        : theme.palette.mainColors.secondaryText,
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
        <Grid2 item="true" size={{ xs: 4, sm: "auto" }}>
          <PassengerSelector onSelectAdults={handleSelectAdults} />
        </Grid2>
        <Grid2 item="true" size={{ xs: 4, sm: "auto" }}>
          <Button
            onClick={(e) => handleMenuOpen(e, "class")}
            endIcon={<ExpandMoreIcon />}
            sx={{
              color: theme.palette.mainColors.text,
              textTransform: "capitalize",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Box
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {selectedClass}
            </Box>
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
                  color: theme.palette.mainColors.text,
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
      <SearchInput
        openAutocomplete={openAutocomplete}
        searchAirports={searchAirports}
        handleWhereChange={handleWhereChange}
        onSelectFlight={handleSelectFlight}
        onSelectDate={handleSelectDate}
        onCloseAutocomplete={() => setOpenAutocomplete(null)}
      />

      <Box display={"flex"} justifyContent={"center"} mt={3}>
        <Button
          onClick={() => fetchData()}
          variant="contained"
          sx={{
            bgcolor: theme.palette.mainColors.mainBlue,
            borderRadius: "36px",
            textTransform: "capitalize",
            "&:hover": { bgcolor: "#AECBFA" },
            position: "absolute",
            top: "100%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          startIcon={<SearchIcon />}
        >
          Explore
        </Button>
      </Box>
    </Grid2>
  );
};

export default SearchBar;
