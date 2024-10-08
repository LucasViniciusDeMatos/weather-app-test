import express from "express";
import { getCitiesController } from "../controllers/city.js";

const router = express.Router();

router.get("/", getCitiesController);

export default router;
