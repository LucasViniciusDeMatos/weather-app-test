import { getApiClient } from "../utils/axios.js";

export const getCities = (query) => {
  return getApiClient({ "content-type": "application/json" }).get(
    "/geo/1.0/direct",
    { params: { q: query, limit: 10 } }
  );
};
