import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Grid2, Paper, Stack, useTheme } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AirlineSeatLegroomReducedIcon from "@mui/icons-material/AirlineSeatLegroomReduced";
import PublicIcon from "@mui/icons-material/Public";

export const ListItemComp = ({ img, primary, secondary }) => {
  return (
    <List sx={{ width: "100%" }}>
      <ListItem>
        {img && (
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
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
  const [expanded, setExpanded] = useState(false);

  return (
    <Paper>
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded((prev) => !prev)}
        sx={{
          border: `1px solid ${theme.palette.mainColors.border}`,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          {expanded ? (
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
                  img={true}
                  primary="Departure * Wed, Feb 5"
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
                <Button variant="outlined">flights</Button>
                <Typography>$42</Typography>
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
              <Box sx={{}}>
                <ListItemComp
                  img={true}
                  primary="3:25PM - 4:40PM"
                  secondary="AJet"
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
                  primary="1hr 15min"
                  secondary="ABD-SAW"
                />
                <Typography>Nonstop</Typography>
                <ListItemComp
                  img={false}
                  primary="56kg CO2e"
                  secondary="Avg emissions"
                />
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography>$42</Typography>
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
              <Box sx={{ display: "flex", gap: 1.25, alignItems: "start" }}>
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
                    3:25 PM * Izmir Adnan Menderes Airport (ADB)
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.mainColors.secondaryText,
                      fontSize: "14px",
                      my: 1.75,
                    }}
                  >
                    Travel time: 1 hr 15 min
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.mainColors.text,
                      fontSize: "18px",
                    }}
                  >
                    4:40PM * Sabiha Gökçen International Airport (SAW)
                  </Typography>
                  <Stack
                    sx={{
                      my: 4,
                      color: theme.palette.mainColors.secondaryText,
                      fontSize: "13px",
                    }}
                  >
                    Pegasus * Economy * Airbus * A321PC * 2195
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
    </Paper>
  );
};

export default FlightsList;
