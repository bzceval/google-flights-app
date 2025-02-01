import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CircularProgress, Box, Typography, useTheme } from "@mui/material";
import L from "leaflet";

// Varsayılan marker simgesi
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const NearByAirports = () => {
  const theme = useTheme(); // MUI temasını al
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Tema değişikliğine göre harita katmanını belirle
  const tileLayerUrl =
    theme.palette.mode === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <Box sx={{ my: 8 }}>
      <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
        Find cheap flights from United Kingdom to anywhere
      </Typography>
      <Box sx={{ textAlign: "center", mt: 2 }}>
        {loading && <CircularProgress />}
      </Box>

      {position && (
        <MapContainer
          center={position}
          zoom={13}
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
