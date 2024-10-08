import { getCities } from "../queries/city.js";

export const getCitiesController = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ code: "Invalid Input" });
  }
  try {
    const result = await getCities(query);
    res.status(200).json(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: "Cannot get the city list. Try later!" });
  }
};
