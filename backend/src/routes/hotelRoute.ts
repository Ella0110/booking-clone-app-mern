import express from "express";
import {
    getAllHotels,
    getHotelById,
    createPaymentIntent,
    createBooking,
    getLatestHotels,
} from "../controllers/hotelController";
import { getHotelByIdValidate, validate } from "../shared/validator";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/", getLatestHotels);
router.get("/search", getAllHotels);
router.get("/:id", getHotelByIdValidate, validate, getHotelById);

router.post(
    "/:hotelId/bookings/payment-intent",
    verifyToken,
    createPaymentIntent
);
router.post("/:hotelId/bookings", verifyToken, createBooking);

export default router;
