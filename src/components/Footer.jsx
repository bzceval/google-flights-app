import React from "react";
import { Box, Divider, Link, useMediaQuery, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        py: 5,
        gap: 2,
        textAlign: "center",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/#">About</Link>
        <Link href="/#">Privacy</Link>
        <Link href="/#">Terms</Link>
        <Link href="/#">Join user studies</Link>
        <Link href="/#">Feedback</Link>
        <Link href="/#">Help Centre and Consumer Information</Link>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box
        component="footer"
        sx={{
          py: 3,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/#">International sites</Link>
        <Link href="/#">Explore flights</Link>
      </Box>
    </Box>
  );
};

export default Footer;
