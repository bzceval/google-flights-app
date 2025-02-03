import React from "react";
import {
  Chip,
  Divider,
  Grid2,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Language as LanguageIcon,
  Payments as PaymentsIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const footerData = [
    { label: "Language: English (United Kingdom)", icon: <LanguageIcon /> },
    { label: "Location: United Kingdom", icon: <LocationOnOutlinedIcon /> },
    { label: "Currency: GBP", icon: <PaymentsIcon /> },
  ];

  return (
    <Grid2
      container
      sx={{
        py: 5,
        gap: 2,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Grid2
        item="true"
        size={{ xs: 12, md: 8 }}
        sx={{ gap: 2, display: "flex", flexWrap: "wrap" }}
      >
        {footerData?.map((item, index) => (
          <Chip
            key={index}
            index={index}
            label={item?.label}
            icon={item.icon}
            variant="outlined"
          />
        ))}
      </Grid2>
      <Grid2 item="true" size={{ xs: 12, md: 8 }}>
        <Typography
          sx={{
            fontSize: "15px",
            color: theme.palette.mainColors.secondaryText,
            my: 2,
          }}
        >
          Current language and currency options applied: English (United States)
          - United States - USD Displayed currencies may differ from the
          currencies used to purchase flights.{" "}
          <Link to="#" sx={{ cursor: "pointer" }}>
            Learn more
          </Link>
        </Typography>
      </Grid2>

      <Grid2 item="true" size={{ xs: 12, md: 12 }}>
        <Typography
          sx={{
            fontSize: "15px",
            color: theme.palette.mainColors.secondaryText,
          }}
        >
          Prices are final and include all taxes and fees, including payment
          fees for the cheapest common payment method (which may differ
          depending on the provider). Additional charges may apply for other
          types of payment, luggage, meals, WLAN or other additional services.
          Prices, availability and travel details are provided based on the
          latest information received from our partners. This information is
          reflected in the results within a period of less than 24 hours.
          <br />
          Additional conditions may also be applied by our partners. You should
          then check prices and conditions with the services providers before
          booking.
        </Typography>
      </Grid2>

      <Grid2
        item="true"
        size={{ xs: 12, md: 10 }}
        sx={{
          py: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "nowrap",
          flexWrap: "wrap",
          color: theme.palette.mainColors.mainBlue,
        }}
      >
        {[
          "About",
          "Privacy",
          "Terms",
          "Join user studies",
          "Feedback",
          "Help Centre",
        ].map((text, idx) => (
          <Link key={idx} href="#" color="primary" underline="hover">
            {text}
          </Link>
        ))}
      </Grid2>

      <Divider sx={{ my: 2 }} />

      <Grid2
        item="true"
        size={{ xs: 12, md: 5 }}
        sx={{
          py: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "nowrap",
          flexWrap: "wrap",
          color: theme.palette.mainColors.mainBlue,
        }}
      >
        {["International sites", "Explore flights"].map((text, idx) => (
          <Link key={idx} href="#" color="primary" underline="hover">
            {text}
          </Link>
        ))}
      </Grid2>
    </Grid2>
  );
};

export default Footer;
