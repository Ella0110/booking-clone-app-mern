import Hotel from "../models/hotel";
import { HotelType } from "../shared/type";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";

export const getMyBookings = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        // console.log("getMyBookings - req.userId", req.userId);
        const hotels = await Hotel.find({
            bookings: { $elemMatch: { userId: req.userId } },
        });

        if (!hotels || !hotels.toString()) {
            // console.log(hotels);
            return next(new AppError("Can not find bookings", 404));
        }

        const result = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter(
                (booking) => booking.userId === req.userId
            );

            const hotelWithUserBookings: HotelType = {
                ...hotel.toObject(),
                bookings: userBookings,
            };

            return hotelWithUserBookings;
        });
        // console.log(result);

        res.status(200).json(result);
    }
);

export const deleteMyBooking = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const hotel = await Hotel.findOneAndUpdate(
            { _id: req.params.hotelId },
            {
                $pull: { bookings: { _id: req.body.bookingId } },
            }
        );

        if (!hotel || !hotel.toString()) {
            return next(new AppError("Can not find hotel by hotelId", 404));
        }

        res.status(204).json({ status: "success" });
    }
);
