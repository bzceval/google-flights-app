import React, { useState, useMemo, useCallback } from "react";
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

const PassengerSelector = ({ onSelectAdults }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infantsSeat: 0,
    infantsLap: 0,
  });

  const passengerTypes = useMemo(
    () => [
      { label: "Adults", subLabel: "", type: "adults", enabled: true },
      {
        label: "Children",
        subLabel: "Aged 2–11",
        type: "children",
        enabled: false,
      },
      {
        label: "Infants",
        subLabel: "In seat",
        type: "infantsSeat",
        enabled: false,
      },
      {
        label: "Infants",
        subLabel: "On lap",
        type: "infantsLap",
        enabled: false,
      },
    ],
    []
  );

  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleChange = useCallback(
    (type, operation) => {
      setPassengers((prev) => {
        const newValue =
          operation === "increase"
            ? prev[type] + 1
            : Math.max(0, prev[type] - 1);

        if (newValue !== prev[type]) {
          const updatedPassengers = { ...prev, [type]: newValue };
          if (type === "adults") onSelectAdults(updatedPassengers.adults);
          return updatedPassengers;
        }
        return prev;
      });
    },
    [onSelectAdults]
  );

  const handleDone = useCallback(() => {
    onSelectAdults(passengers.adults);
    handleClose();
  }, [onSelectAdults, passengers.adults, handleClose]);

  return (
    <>
      <Button
        sx={{ color: theme.palette.mainColors.text }}
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
            color: theme.palette.mainColors.secondaryText,
            padding: "10px",
            borderRadius: "5px",
            minWidth: "275px",
          },
        }}
      >
        {passengerTypes.map((item) => (
          <MenuItem
            key={item.type}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography
                sx={{
                  color: item.enabled
                    ? theme.palette.mainColors.text
                    : theme.palette.mainColors.secondaryText,
                }}
              >
                {item.label}
              </Typography>
              {item.subLabel && (
                <Typography variant="caption">{item.subLabel}</Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                size="small"
                onClick={() => handleChange(item.type, "decrease")}
                sx={{
                  borderRadius: "5px",
                  color: item.enabled
                    ? theme.palette.mainColors.text
                    : theme.palette.mainColors.secondaryText,
                }}
                disabled={!item.enabled || passengers[item.type] === 0}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography
                sx={{
                  color: item.enabled
                    ? theme.palette.mainColors.text
                    : theme.palette.mainColors.secondaryText,
                }}
              >
                {passengers[item.type]}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleChange(item.type, "increase")}
                sx={{
                  color: item.enabled
                    ? theme.palette.mainColors.text
                    : theme.palette.mainColors.secondaryText,
                  borderRadius: "5px",
                }}
                disabled={!item.enabled}
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
            onClick={handleDone}
          >
            Done
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default PassengerSelector;
