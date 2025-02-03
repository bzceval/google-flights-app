import { Grid2, Typography } from "@mui/material";
import React from "react";
import { ListItemCompResponsive } from "./FlyListItemComp";
import dayjs from "dayjs";

const FlightsMdDownComp = ({ item, formatDuration }) => {
  return (
    <Grid2
      container
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <Grid2
        item="true"
        size={{ xs: 10, sm: 8 }}
        sx={{ flexDirection: "column" }}
      >
        <ListItemCompResponsive
          imgLink={item.legs[0]?.carriers.marketing[0].logoUrl}
          img={true}
          primary={`${dayjs(item.legs[0].departure).format("h:mm A")} `}
          secondary={item.legs[0].carriers.marketing[0].name}
          primary1={`${dayjs(item.legs[0].arrival).format("h:mm A")}`}
          secondary1={item.legs[0].carriers.marketing[0].name}
        />
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 400,
            fontSize: "12px",
          }}
        >
          {item.legs[0].stopCount === 0
            ? "Nonstop"
            : item.legs[0].stopCount + " Transfer"}{" "}
          * {formatDuration(item.legs[0].durationInMinutes)} *{" "}
          {item.legs[0]?.carriers.marketing[0].name}
        </Typography>
      </Grid2>
      <Grid2
        item="true"
        size={{ xs: 2, sm: 4 }}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography>{item.price.formatted}</Typography>
      </Grid2>
    </Grid2>
  );
};

export default FlightsMdDownComp;
