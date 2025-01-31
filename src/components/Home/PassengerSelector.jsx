import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const PassengerSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infantsSeat: 0,
    infantsLap: 0,
  });
  const theme = useTheme();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (type, operation) => {
    setPassengers((prev) => ({
      ...prev,
      [type]:
        operation === "increase" ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  return (
    <>
      <Button
        sx={{
          color: "#fff",
        }}
        startIcon={<PeopleIcon />}
        onClick={handleOpen}
      >
        {passengers.adults +
          passengers.children +
          passengers.infantsSeat +
          passengers.infantsLap}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#202124",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            minWidth: "275px",
          },
        }}
      >
        {[
          { label: "Adults", subLabel: "", type: "adults" },
          { label: "Children", subLabel: "Aged 2–11", type: "children" },
          { label: "Infants", subLabel: "In seat", type: "infantsSeat" },
          { label: "Infants", subLabel: "On lap", type: "infantsLap" },
        ].map((item, index) => (
          <MenuItem
            key={index}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography>{item.label}</Typography>
              {item.subLabel && (
                <Typography variant="caption">{item.subLabel}</Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                size="small"
                onClick={() => handleChange(item.type, "decrease")}
                sx={{
                  color: "#fff",
                  borderRadius: "5px", 
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography>{passengers[item.type]}</Typography>
              <IconButton
                size="small"
                onClick={() => handleChange(item.type, "increase")}
                sx={{
                  color: "#fff",
                  borderRadius: "5px",
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </MenuItem>
        ))}

        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Button
            sx={{
              color: theme.palette.mainColors.btnColor,
              textTransform: "capitalize",
              fontWeight: 500,
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: theme.palette.mainColors.btnColor,
              textTransform: "capitalize",
              fontWeight: 500,
            }}
            onClick={handleClose}
          >
            Done
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default PassengerSelector;
