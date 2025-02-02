import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Container, Grid2, Stack, useTheme } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AirlineSeatLegroomReducedIcon from "@mui/icons-material/AirlineSeatLegroomReduced";
import PublicIcon from "@mui/icons-material/Public";
import SearchBar from "../components/Home/SearchBar";
import { useLocation } from "react-router-dom";
import moment from "moment";

export const ListItemComp = ({ img, imgLink, primary, secondary }) => {
  return (
    <List sx={{ width: "100%" }}>
      <ListItem>
        {img === true && (
          <ListItemAvatar>
            <Avatar>
              <img
                src={imgLink}
                alt="Flights"
                style={{
                  width: "100%",  
                  height: "100%", 
                  objectFit: "cover",  
                  borderRadius: "50%",  
                }}
              />
            </Avatar>
          </ListItemAvatar>
        )}
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    </List>
  );
};

const FlightsList = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState([]);
  const location = useLocation();
  const flightData = location.state;

  const formatDuration = (minutes) => {
    const duration = moment.duration(minutes, "minutes");
    return `${
      Math.floor(duration.asHours()) > 0
        ? `${Math.floor(duration.asHours())} hour `
        : ""
    }${duration.minutes() > 0 ? `${duration.minutes()} minutes` : ""}`.trim();
  };

  const handleChange = (index) => {
    setExpanded((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <Container maxWidth="lg">
      <SearchBar bg={"none"} />

      <Stack my={6}>
        {flightData?.flightData?.data?.itineraries &&
          flightData?.flightData?.data?.itineraries?.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded.includes(index)}
              onChange={() => handleChange(index)}
              sx={{
                border: `1px solid ${theme.palette.mainColors.border}`,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                {expanded.includes(index) ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <ListItemComp
                        imgLink={item.legs[0].carriers.marketing[0].logoUrl}
                        img={true}
                        primary={`Departure * ${moment(
                          item.legs[0].departure
                        ).format("ddd, MM DD")}`}
                        secondary=""
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                        gap: 3,
                      }}
                    >
                      <ListItemComp
                        img={false}
                        primary="56kg CO2e"
                        secondary="Avg emissions"
                      />
                      {/* <Button variant="outlined">flights</Button> */}
                      <Typography>{item.price.formatted}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <ListItemComp
                        imgLink={item.legs[0]?.carriers.marketing[0].logoUrl}
                        img={true}
                        primary={`${moment(item.legs[0].departure).format(
                          "h:mm A"
                        )} - ${moment(item.legs[0].departure).format(
                          "h:mm A"
                        )}`}
                        secondary={item.legs[0].carriers.marketing[0].name}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <ListItemComp
                        img={false}
                        primary={formatDuration(item.legs[0].durationInMinutes)}
                        secondary={`${item.legs[0].origin.displayCode} - ${item.legs[0].destination.displayCode}`}
                      />
                      <Typography>
                        {item.legs[0].stopCount === 0
                          ? "Nonstop"
                          : item.legs[0].stopCount + "Transfer"}
                      </Typography>
                      <ListItemComp
                        img={false}
                        primary="56kg CO2e"
                        secondary="Avg emissions"
                      />
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography>{item.price.formatted}</Typography>
                    </Box>
                  </Box>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Grid2
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ width: "90%", mx: "auto" }}
                >
                  <Grid2 size={8} sx={{ padding: "auto 2" }}>
                    <Box
                      sx={{ display: "flex", gap: 1.25, alignItems: "start" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 0.5,
                          my: 0.75,
                        }}
                      >
                        <CircleOutlinedIcon sx={{ fontSize: 14 }} />
                        <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                        <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                        <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                        <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                        <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                        <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                        <CircleOutlinedIcon sx={{ fontSize: 14 }} />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: theme.palette.mainColors.text,
                            fontSize: "18px",
                          }}
                        >
                          {moment(item.legs[0].departure).format("hh:mm A")} *{" "}
                          {item.legs[0].origin.city}{" "}
                          {item.legs[0].origin.displayCode}
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.mainColors.secondaryText,
                            fontSize: "14px",
                            my: 1.75,
                          }}
                        >
                          Travel time:{" "}
                          {formatDuration(item.legs[0].durationInMinutes)}
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.mainColors.text,
                            fontSize: "18px",
                          }}
                        >
                          {moment(item.legs[0].arrival).format("hh:mm A")} *{" "}
                          {item.legs[0].destination.city}{" "}
                          {item.legs[0].destination.displayCode}
                        </Typography>
                        <Stack
                          sx={{
                            my: 4,
                            color: theme.palette.mainColors.secondaryText,
                            fontSize: "13px",
                          }}
                        >
                          {item.legs[0].carriers.marketing[0].name} * Economy *
                          Airbus * A321PC * 2195
                        </Stack>
                      </Box>
                    </Box>
                  </Grid2>
                  <Grid2 size={4} padding={2}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: "13px",
                        color: theme.palette.mainColors.secondaryText,
                      }}
                    >
                      <AirlineSeatLegroomReducedIcon />
                      Below average legroom (28 in)
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: "13px",
                        color: theme.palette.mainColors.secondaryText,
                      }}
                    >
                      <PublicIcon fontSize="small" />
                      Emissions estimate: 51 kg CO2e
                    </Typography>
                  </Grid2>
                </Grid2>
              </AccordionDetails>
            </Accordion>
          ))}
      </Stack>
    </Container>
  );
};

export default FlightsList;
