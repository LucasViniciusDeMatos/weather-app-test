import { getApiClient } from "../utils/axios.js";

export const getWeather = (params) => {
  return getApiClient({ "content-type": "application/json" }).get(
    "/data/2.5/weather",
    { params }
  );
};
