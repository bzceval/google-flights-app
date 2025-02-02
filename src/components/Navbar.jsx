import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightIcon from "@mui/icons-material/Nightlight";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GoogleDarkIcon from "../assets/images/googlelogo_dark.svg";
import GoogleLightIcon from "../assets/images/googlelogo_light.svg";

const Navbar = () => {
  const theme = useTheme();
  const darkMode = true;
  const settings = ["Use device default", "Dark Mode", "Light Mode"];
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuToggle = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.mainColors.default,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton size="large" edge="start" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <IconButton sx={{ "&:hover": { backgroundColor: "transparent" } }}>
            <Link to="/">
              <img
                src={darkMode ? GoogleDarkIcon : GoogleLightIcon}
                alt="Google Logo"
                style={{
                  marginTop: '.6rem'
                }}
              />
            </Link>
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Tooltip title="Change appearance">
            <IconButton
              onClick={handleMenuToggle}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {darkMode ? (
                <LightModeOutlinedIcon fontSize="small" />
              ) : (
                <NightlightIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleMenuClose}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>

          <Tooltip
            title="Google apps"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <IconButton sx={{ display: "flex", alignItems: "center" }}>
              <AppsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: ".7rem" }}>
                  Google accounts
                </Typography>
                <Typography sx={{ fontSize: ".7rem" }}>Busra Ceval</Typography>
                <Typography sx={{ fontSize: ".7rem" }}>
                  busraaceval@gmail.com
                </Typography>
              </Box>
            }
          >
            <IconButton sx={{ display: "flex", alignItems: "center" }}>
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
