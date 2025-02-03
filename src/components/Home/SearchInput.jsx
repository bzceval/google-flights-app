import {
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
import SelectDateComp from "./DateComp/SelectDateComp";

export const InputAutoComp = ({
  type,
  openAutocomplete,
  searchAirports,
  handleWhereChange,
  onSelectFlight,
  onCloseAutocomplete,
}) => {
  return (
    <Autocomplete
      open={openAutocomplete === type}
      options={searchAirports?.[type] || []}
      getOptionLabel={(option) => option.presentation?.suggestionTitle || ""}
      onInputChange={(e) => handleWhereChange(e, type)}
      onChange={(event, value) => {
        onSelectFlight(value, type);
        onCloseAutocomplete();
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
  openAutocomplete,
  searchAirports,
  selectedOption,
  handleWhereChange,
  onSelectFlight,
  onSelectDate,
  onCloseAutocomplete,
}) => {
  return (
    <Stack>
      <Grid2 container spacing={2} alignItems="center" justifyContent="center">
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
              onCloseAutocomplete={onCloseAutocomplete}
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
              onCloseAutocomplete={onCloseAutocomplete}
            />
          </Stack>
        </Grid2>
        <Grid2 item={"true"} xs={12} sm={5} md={5}>
          <SelectDateComp onSelectDate={onSelectDate} />
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default SearchInput;
