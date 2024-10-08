import React, { useState, useMemo } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { LocationOn as LocationOnIcon } from "@mui/icons-material";
import { debounce } from "lodash";
import { getCities } from "../../../queries/weather.js";

const SelectCity = ({ city, setCity, setError }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async (query, offset) => {
    if (query.length < 3) {
      setOptions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getCities(query, offset)
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => {
        setError(err.response?.data.code || err.message);
        setOptions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedFetchCities = useMemo(() => debounce(fetchCities, 500), []);

  const handleInputChange = (e) => {
    setError("");
    debouncedFetchCities(e.target.value, 0);
  };

  const handleChange = (_, newValue) => {
    setCity(newValue);
    if (!newValue) {
      setOptions([]);
    }
  };

  return (
    <Autocomplete
      fullWidth
      value={city}
      autoComplete
      includeInputInList
      options={options}
      getOptionLabel={(option) =>
        `${option.name}, ${option.state}, ${option.country}`
      }
      filterOptions={(x) => x}
      noOptionsText="No locations"
      loading={loading}
      onInputCapture={handleInputChange}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a City"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flexShrink: 0 }}>
                <LocationOnIcon sx={{ color: "text.sedondary" }} />
              </Box>
              <Box sx={{ flexGrow: 1, wordWrap: "break-word" }}>
                <Typography>{option.name}</Typography>
                <Typography>{`${option.state}, ${option.country}`}</Typography>
              </Box>
            </Box>
          </li>
        );
      }}
    />
  );
};

export default SelectCity;
