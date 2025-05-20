import express from "express";
import { getAllHotels } from "../controllers/hotelController";

const router = express.Router();

router.get("/search", getAllHotels);

export default router;
