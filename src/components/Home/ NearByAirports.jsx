import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  CircularProgress,
  Box,
  Typography,
  useTheme,
  Chip, 
  Grid2,
} from "@mui/material";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { getNearByAirports } from "../../services/api";
import { ErrorDialog } from "../../helper";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const NearByAirports = () => {
  const theme = useTheme();
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nearAirports, setNearAirports] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoading(false);
        },
        (error) => {
          ErrorDialog(error);
          setLoading(false);
        }
      );
    } else {
      ErrorDialog("Geolocation is not supported.");
      setLoading(false);
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (!position) return;
    setLoading(true);
    try {
      const response = await getNearByAirports(position);
      setNearAirports(response?.data);
    } catch (error) {
      ErrorDialog(error);
    } finally {
      setLoading(false);
    }
  }, [position]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tileLayerUrl = useMemo(
    () =>
      theme.palette.mode === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    [theme.palette.mode]
  );

  const airportChips = useMemo(
    () =>
      nearAirports?.data?.nearby?.slice(0, 4).map((item, index) => (
        <Chip
          key={index}
          label={item?.presentation?.suggestionTitle}
          variant="outlined"
          sx={{
            fontWeight: "bold",
            color: theme.palette.mainColors.text,
            padding: "17px",
            cursor: "pointer",
            fontSize: "14px",
            whiteSpace: "nowrap",
            borderRadius: "20px",
            ":hover": {
              color: theme.palette.mainColors.mainBlue,
            },
          }}
        />
      )),
    [nearAirports, theme.palette.mainColors]
  );

  return (
    <Grid2 container sx={{ my: 8, width: "100%" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "200px",
            mt: 2,
            p: 2,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Find cheap flights from{" "}
            {nearAirports?.data?.current?.presentation?.subtitle} to anywhere
          </Typography>
          <Box sx={{ my: 2, gap: 1, display: "flex", flexWrap: "wrap" }}>
            {airportChips}
          </Box>
          {position && (
            <MapContainer
              center={position}
              zoom={5}
              style={{ height: "250px", width: "100%", marginTop: "20px" }}
            >
              <TileLayer
                url={tileLayerUrl}
                attribution="&copy; OpenStreetMap &copy; Carto"
              />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  📍 Your Current Location <br />
                  Latitude: {position[0]} <br />
                  Longitude: {position[1]}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </>
      )}
    </Grid2>
  );
};

export default NearByAirports;
