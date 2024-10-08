import { getWeather } from "../queries/weather.js";

export const getWeatherController = async (req, res) => {
  const { city, lat, lon } = req.query;
  try {
    if (!!city) {
      const result = await getWeather({ q: city, units: "metric" });
      return res.status(200).json(result.data);
    }
    if (!lat || !lon) {
      return res.status(400).json({ code: "Invalid Input" });
    }
    const result = await getWeather({ lat, lon, units: "metric" });
    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: "Cannot get the weather info. Try later" });
  }
};
