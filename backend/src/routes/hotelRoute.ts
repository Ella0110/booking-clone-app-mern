import express from "express";
import { getAllHotels, getHotelById } from "../controllers/hotelController";
import { getHotelByIdValidate, validate } from "../shared/validator";

const router = express.Router();

router.get("/search", getAllHotels);
router.get("/:id", getHotelByIdValidate, validate, getHotelById);

export default router;
