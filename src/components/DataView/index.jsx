import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Tooltip,
} from "@mui/material";
import { format } from "date-fns";

const DataView = ({ loading, error, weather, isFavorite = false }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress sx={{ size: 40 }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={{ textAlign: "center", color: "error.main" }}>
        {error}
      </Typography>
    );
  }

  if (!weather) {
    return (
      <Typography sx={{ textAlign: "center", color: "primary.main" }}>
        {isFavorite
          ? "Choose one of your favorites"
          : "Choose a City or Get your location info"}
      </Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
      <Paper
        elevation={5}
        sx={{
          minWidth: 250,
          width: "100%",
          bgcolor: "primary.light",
          p: 3,
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                flexShrink: 0,
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {`${weather.name}, ${weather.sys.country}`}
            </Typography>
            <Typography>{`(${weather.coord.lat}, ${weather.coord.lon})`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: 32, lineHeight: 1 }}
            >
              {format(new Date(), "dd")}
            </Typography>
            <Typography>{format(new Date(), "MMM, yyyy")}</Typography>
          </Box>
        </Box>
        {!!weather.weather?.length && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title={weather.weather[0].description} placement="top">
              <Box
                component="img"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              />
            </Tooltip>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 20 }}>{`${weather.main.temp}°C / ${
            weather.main.humidity
          }%${
            weather.weather.length ? ` / ${weather.weather[0].main}` : ""
          }`}</Typography>
          <Typography
            sx={{ fontSize: 20 }}
          >{`Wind: ${weather.wind.speed}mph / ${weather.wind.deg}°`}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default DataView;
