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
    <Box display="flex" justifyContent="center" bgcolor="#303134">
      <Paper
        elevation={3}
        sx={{
          width: "60%",
          p: 2,
          borderRadius: 3,
          bgcolor: "#303134",
          color: "#fff",
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

        <Grid2 container spacing={1} alignItems="center" mt={2}>
          <Grid2 item xs={5}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Where from?"
              InputProps={{
                startAdornment: (
                  <FiberManualRecordOutlinedIcon sx={{ mr: 1 }} />
                ),
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

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#8AB4F8",
              color: "#000",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              boxShadow: "0px 4px 10px rgba(138, 180, 248, 0.5)",
              "&:hover": { bgcolor: "#AECBFA" },
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SearchBar;
