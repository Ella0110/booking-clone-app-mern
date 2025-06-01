import express from "express";
import verifyToken from "../middleware/auth";
import {
    deleteMyBooking,
    getMyBookings,
} from "../controllers/myBookingController";

const router = express.Router();

router.get("/", verifyToken, getMyBookings);
router.delete("/:hotelId", deleteMyBooking);

export default router;
