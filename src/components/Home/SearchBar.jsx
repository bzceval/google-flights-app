import React, { useState } from "react";
import {
  Box,
  Paper,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
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

const menuOptions = [
  { label: "Round trip", icon: <SyncAltIcon /> },
  { label: "One way", icon: <TrendingFlatIcon /> },
  { label: "Multi City", icon: <MultipleStopIcon /> },
];

const classOptions = ["Economy", "Premium Economy", "Business", "First"];

const SearchBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [classEl, setClassEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(menuOptions[0]); // Başlangıç değeri nesne
  const [selectedClass, setSelectedClass] = useState("Economy");

  const handleMenuOpen = (event, type) =>
    type === "trip"
      ? setAnchorEl(event.currentTarget)
      : setClassEl(event.currentTarget);

  const handleMenuClose = (option, type) => {
    if (type === "trip") setSelectedOption(option);
    else setSelectedClass(option);
    type === "trip" ? setAnchorEl(null) : setClassEl(null);
  };

  return (
    <Paper
      sx={{
        height: "170px",
        padding: "10px 30px",
        position: "relative",
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
              color: "#fff",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: 1,
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
                <Box display="flex" alignItems="center" gap={1}>
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
            sx={{ color: "#fff", textTransform: "capitalize" }}
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
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={1} alignItems="center" mt={2} mb={4}>
        <Grid2 item xs={5}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Where from?"
            InputProps={{
              startAdornment: <FiberManualRecordOutlinedIcon sx={{ mr: 1 }} />,
            }}
            sx={{
              bgcolor: "#202124",
              borderRadius: 1,
              input: { color: "#fff" },
            }}
          />
        </Grid2>
        <Grid2 item>
          <IconButton sx={{ color: "#fff" }}>
            <SwapHorizIcon />
          </IconButton>
        </Grid2>
        <Grid2 item xs={5}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Where to?"
            InputProps={{
              startAdornment: <LocationOnOutlinedIcon sx={{ mr: 1 }} />,
            }}
            sx={{
              bgcolor: "#202124",
              borderRadius: 1,
              input: { color: "#fff" },
            }}
          />
        </Grid2>
      </Grid2>

      <Box
        sx={{
          position: "absolute",
          top: "85%",
          left: "50%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#8AB4F8",
            textDecoration: "capitalize",
            borderRadius: "24px",
            textTransform: "capitalize",
            "&:hover": { bgcolor: "#AECBFA" },
          }}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchBar;
