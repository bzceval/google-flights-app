import {
  Button,
  TextField,
  IconButton,
  Autocomplete,
  Grid2,
  Stack,
} from "@mui/material";
import {
  SwapHoriz as SwapHorizIcon,
  FiberManualRecordOutlined as FiberManualRecordOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from "@mui/icons-material";
import React from "react";
import Departure from "./DateComp/Departure";
import RoundTrip from "./DateComp/RoundTrip";

export const InputAutoComp = ({
  type,
  openAutocomplete,
  searchAirports,
  handleWhereChange,
  onSelectFlight,
}) => {
  return (
    <Autocomplete
      open={openAutocomplete === type}
      options={searchAirports?.[type] || []}
      getOptionLabel={(option) => option.presentation?.suggestionTitle || ""}
      onInputChange={(e) => handleWhereChange(e, type)}
      onChange={(event, value) => {
        onSelectFlight(value, type);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          variant="outlined"
          placeholder={type === "whereFrom" ? "Where from?" : "Where to?"}
          InputProps={{
            ...params.InputProps,
            startAdornment:
              type === "whereFrom" ? (
                <FiberManualRecordOutlinedIcon sx={{ mr: 1 }} />
              ) : (
                <LocationOnOutlinedIcon sx={{ mr: 1 }} />
              ),
          }}
          sx={{
            minWidth: 250,
            borderRadius: 1,
            color: "#fff",
            input: { color: "#fff" },
          }}
        />
      )}
    />
  );
};

const SearchInput = ({
  flights,
  openAutocomplete,
  searchAirports,
  selectedOption,
  handleWhereChange,
  handleAddFlight,
  onSelectFlight,
  onDate,
}) => {
  return (
    <Stack>
      {flights.map((_, index) => (
        <Grid2
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          key={index}
        >
          <Grid2 item={"true"} xs={12} sm={7} md={7}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <InputAutoComp
                type="whereFrom"
                openAutocomplete={openAutocomplete}
                searchAirports={searchAirports}
                handleWhereChange={handleWhereChange}
                onSelectFlight={onSelectFlight}
              />
              <IconButton sx={{ color: "#fff" }}>
                <SwapHorizIcon />
              </IconButton>
              <InputAutoComp
                type="whereTo"
                openAutocomplete={openAutocomplete}
                searchAirports={searchAirports}
                handleWhereChange={handleWhereChange}
                onSelectFlight={onSelectFlight}
              />
            </Stack>
          </Grid2>
          <Grid2 item={"true"} xs={12} sm={5} md={5}>
            {selectedOption.label === "Round trip" ? (
              <RoundTrip />
            ) : (
              <Departure onDate={onDate}/>
            )}
          </Grid2>
        </Grid2>
      ))}

      {selectedOption.label === "Multi City" && flights.length < 5 && (
        <Grid2 container justifyContent="center" my={3}>
          <Grid2 item={"true"} xs={6} sm={4} md={3} lg={3}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#8AB4F8",
                borderRadius: "24px",
                textTransform: "capitalize",
                "&:hover": { bgcolor: "#AECBFA" },
              }}
              onClick={handleAddFlight}
            >
              Add Flight
            </Button>
          </Grid2>
        </Grid2>
      )}
    </Stack>
  );
};

export default SearchInput;
