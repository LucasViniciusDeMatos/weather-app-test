import express from "express";
import cityRouter from "./city.js";
import weatherRouter from "./weather.js";

const router = express.Router();

router.use("/cities", cityRouter);
router.use("/weather", weatherRouter);

export default router;
