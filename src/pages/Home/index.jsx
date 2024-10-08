import React, { useState, useEffect } from "react";
import { Box, Button, Grid2, Typography } from "@mui/material";
import SelectCity from "./components/SelectCity";
import DataView from "../../components/DataView";
import { getWeather } from "../../queries/weather";
import { useFavorites } from "../../modules/favoriteProvider";
import { isEqual } from "lodash";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const { favorites, setFavorites } = useFavorites();

  const showFavorite =
    !!city && !favorites.some((favorite) => isEqual(favorite, city));

  const fetchWeather = (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    getWeather(data)
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

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setError("");
          setCity(null);
          fetchWeather({
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setError(
              "Geolocation access has been blocked. Please enable it in your browser settings."
            );
          } else {
            setError(err.message);
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  const addFavorite = () => {
    setFavorites([...favorites, { ...city }]);
  };

  useEffect(() => {
    if (city) {
      fetchWeather({ city: city.name });
    }
  }, [city]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid2 container sx={{ alignItems: "flex-start", mb: 4 }}>
        <Grid2 size={{ xs: 12, lg: 5 }}>
          <SelectCity city={city} setCity={setCity} setError={setError} />
          {showFavorite && (
            <Button
              color="success"
              sx={{ textTransform: "none" }}
              onClick={addFavorite}
            >
              Add this to favorites
            </Button>
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 2 }}>
          <Typography sx={{ textAlign: "center", pt: { xs: 1, lg: 2 }, pb: 1 }}>
            OR
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 5 }}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ height: 50, fontWeight: "bold" }}
            onClick={getLocation}
          >
            Get my location info
          </Button>
        </Grid2>
      </Grid2>
      <DataView loading={loading} error={error} weather={weather} />
    </Box>
  );
};

export default Home;
