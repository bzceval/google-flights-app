import {
  TextField,
  IconButton,
  Autocomplete,
  Grid2,
  Stack,
  useTheme,
} from "@mui/material";
import {
  SwapHoriz as SwapHorizIcon,
  TripOrigin as TripOriginIcon,
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
  const theme = useTheme();
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
      sx={{ width: "100%" }}
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
                <TripOriginIcon
                  sx={{
                    mr: 1,
                    color: theme.palette.mainColors.secondaryText,
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <LocationOnOutlinedIcon
                  sx={{ mr: 1, color: theme.palette.mainColors.secondaryText }}
                />
              ),
          }}
          sx={{
            secondaryTextRadius: 1,
            color: theme.palette.mainColors.text,
          }}
        />
      )}
    />
  );
};

const SearchInput = ({
  openAutocomplete,
  searchAirports,
  handleWhereChange,
  onSelectFlight,
  onSelectDate,
  onCloseAutocomplete,
}) => {
  const theme = useTheme();
  return (
    <Grid2
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid2 item="true" size={{ xs: 12, sm: 7, md: 8 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          width={"100%"}
        >
          <InputAutoComp
            type="whereFrom"
            openAutocomplete={openAutocomplete}
            searchAirports={searchAirports}
            handleWhereChange={handleWhereChange}
            onSelectFlight={onSelectFlight}
            onCloseAutocomplete={onCloseAutocomplete}
          />
          <IconButton
            sx={{
              color: theme.palette.mainColors.secondaryText,
              margin: 0,
              padding: "0px",
              display: {xs: "none", sm: "block"}
            }}
          >
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
      <Grid2 item="true" size={{ xs: 12, sm: 5, md: 4 }}>
        <Stack direction="column" alignItems="stretch">
          <SelectDateComp onSelectDate={onSelectDate} />
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default SearchInput;
