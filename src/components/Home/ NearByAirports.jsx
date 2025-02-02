import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  CircularProgress,
  Box,
  Typography,
  useTheme,
  Chip,
} from "@mui/material";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { getNearByAirports } from "../../services/api";

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
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setLoading(false);
        },
        (error) => {
          console.error("Konum alınamadı:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation desteklenmiyor.");
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
      console.error("Havaalanları alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  }, [position]);

  useEffect(() => {
    if (position) {
      fetchData();
    }
  }, [fetchData, position]);

  useEffect(() => {
    if (position) {
      fetchData();
    }
  }, [fetchData, position]);

  console.log(nearAirports.data);

  const tileLayerUrl =
    theme.palette.mode === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return loading ? (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ my: 8 }}>
      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
        Find cheap flights from{" "}
        {nearAirports?.data?.current?.presentation?.subtitle} to anywhere
      </Typography>
      <Box sx={{ my: 2, gap: 1, display: "flex", flexWrap: "wrap" }}>
        {nearAirports?.data?.nearby?.slice(0, 4).map((item, index) => (
          <Chip
            key={index}
            label={item?.presentation?.suggestionTitle}
            variant="outlined"
            sx={{
              fontWeight: "bold",
              color: theme.palette.mainColors.text,
              paddingTop: "17px",
              paddingBottom: "17px",
              cursor: "pointer",
              fontSize: "14px",
              letterSpacing: "0.25px",
              whiteSpace: "nowrap",
              borderRadius: "20px",
              ":hover": {
                color: theme.palette.mainColors.mainBlue,
              },
            }}
          />
        ))}
      </Box>

      {position && (
        <MapContainer
          center={position}
          zoom={5}
          style={{ height: "250px", width: "100%", marginTop: "20px" }}
        >
          <TileLayer
            url={tileLayerUrl}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">Carto</a>'
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              📍 Mevcut Konumun <br />
              Latitude: {position[0]} <br />
              Longitude: {position[1]}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </Box>
  );
};

export default NearByAirports;
