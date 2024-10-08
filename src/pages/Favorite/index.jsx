import React, { useState } from "react";
import { Box, MenuList, MenuItem, Typography } from "@mui/material";
import { getWeather } from "../../queries/weather";
import { useFavorites } from "../../modules/favoriteProvider";
import DataView from "../../components/DataView";

const Favorite = () => {
  const { favorites } = useFavorites();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  const handleClick = (city) => {
    if (loading) {
      return;
    }
    setLoading(true);
    getWeather({ city: city.name })
      .then((res) => {
        setWeather(res.data);
      })
      .catch((err) => {
        setError(err.response?.data.code || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 30,
          p: 3,
          mb: 1,
        }}
      >
        Favorite Cities
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "center",
          alignItems: { xs: "center", lg: "flex-start" },
        }}
      >
        <MenuList sx={{ maxWidth: 300, flexShrink: 0, mr: { xs: 0, lg: 4 } }}>
          {favorites.map((favorite) => (
            <MenuItem
              key={`${favorite.name}, ${favorite.state}, ${favorite.country}`}
              onClick={() => handleClick(favorite)}
            >
              {`${favorite.name}, ${favorite.state}, ${favorite.country}`}
            </MenuItem>
          ))}
        </MenuList>
        <Box sx={{ display: "flex", justifyContent: "center", minWidth: 250 }}>
          <DataView
            loading={loading}
            error={error}
            weather={weather}
            isFavorite
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Favorite;
