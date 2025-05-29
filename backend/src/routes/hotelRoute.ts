import express from "express";
import {
    getAllHotels,
    getHotelById,
    createPaymentIntent,
    createBooking,
} from "../controllers/hotelController";
import { getHotelByIdValidate, validate } from "../shared/validator";
import { validateToken } from "../controllers/authController";

const router = express.Router();

router.get("/search", getAllHotels);
router.get("/:id", getHotelByIdValidate, validate, getHotelById);
router.post("/payment-intent", validateToken, createPaymentIntent);
router.post("/:hotelId/bookings", validateToken, createBooking);

export default router;
