import express from "express";
import { getWeatherController } from "../controllers/weather.js";

const router = express.Router();

router.get("/", getWeatherController);

export default router;
