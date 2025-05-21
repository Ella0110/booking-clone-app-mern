import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/type";
import AppError from "../utils/appError";

export const getAllHotels = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const pageSize = 5; // 每页有几个酒店
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        ); // 当前在第几页
        const skip = (pageNumber - 1) * pageSize; // 跳过多少条酒店数据

        const hotelsList = await Hotel.find().skip(skip).limit(pageSize);
        if (!hotelsList.toString()) {
            next(new AppError("Failed to find hotel!", 404));
        }
        console.log(!hotelsList.toString());
        console.log(hotelsList);
        const totalItems = await Hotel.countDocuments(); // 酒店总量
        const response: HotelSearchResponse = {
            data: hotelsList,
            pagination: {
                total: totalItems,
                page: pageNumber,
                pages: Math.ceil(totalItems / pageSize),
            },
        };
        res.status(200).json(response);
    }
);
