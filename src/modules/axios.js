import axios from "axios";

export const getApiClient = (headers) => {
  return axios.create({
    headers,
    baseURL: process.env.REACT_APP_API_URL,
  });
};
