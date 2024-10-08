import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getApiClient = (headers) => {
  return axios.create({
    headers,
    baseURL: process.env.OPEN_WEATHER_APP_API_URL,
    params: {
      appid: process.env.OPEN_WEATHER_APP_API_KEY,
    },
  });
};
