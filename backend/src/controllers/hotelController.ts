import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/type";

export const getAllHotels = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const perPage = 5; // 每页有几个酒店
        const page = parseInt(req.query.page ? req.query.page.toString() : "1"); // 当前在第几页
        const skip = (perPage - 1) * page; // 跳过多少条酒店数据

        const hotelsList = await Hotel.find().skip(skip).limit(perPage);

        const totalItems = await Hotel.countDocuments(); // 酒店总量
        const response: HotelSearchResponse = {
            data: hotelsList,
            pagination: {
                total: totalItems,
                page: page,
                pages: Math.ceil(totalItems / page),
            },
        };
        res.status(200).json(response);
    }
);
