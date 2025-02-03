import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Container,
  Grid2,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AirlineSeatLegroomReducedIcon from "@mui/icons-material/AirlineSeatLegroomReduced";
import PublicIcon from "@mui/icons-material/Public";
import SearchBar from "../components/Home/SearchBar";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import FlightsMdUpComp from "../components/Flights/FlightsMdUpComp";
import { ListItemComp } from "../components/Flights/FlyListItemComp";
import FlightsMdDownComp from "../components/Flights/FlightsMdDownComp";

dayjs.extend(duration);

const formatDuration = (minutes) => {
  const dur = dayjs.duration(minutes, "minutes");
  return `${dur.hours() > 0 ? `${dur.hours()} hour ` : ""}${
    dur.minutes() > 0 ? `${dur.minutes()} minutes` : ""
  }`.trim();
};

const FlightsList = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState([]);
  const location = useLocation();
  const flightData = location.state;
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

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
                        primary={`Departure * ${dayjs(
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
                  <>
                    {isMdUp ? (
                      <FlightsMdUpComp
                        item={item}
                        formatDuration={formatDuration}
                      />
                    ) : (
                      <FlightsMdDownComp
                        item={item}
                        formatDuration={formatDuration}
                      />
                    )}
                  </>
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
                          {dayjs(item.legs[0].departure).format("hh:mm A")} *{" "}
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
                          {dayjs(item.legs[0].arrival).format("hh:mm A")} *{" "}
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
