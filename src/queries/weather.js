import { getApiClient } from "../modules/axios.js";

export const getCities = (query) => {
  return getApiClient({ "content-type": "application/json" }).get(
    "/api/cities",
    { params: { query } }
  );
};

export const getWeather = (params) => {
  return getApiClient({ "content-type": "application/json" }).get(
    "/api/weather",
    { params: { ...params } }
  );
};
