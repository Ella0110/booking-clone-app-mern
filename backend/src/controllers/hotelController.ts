import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse } from "../shared/type";
import AppError from "../utils/appError";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    }

    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        };
    }

    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }

    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
            ? queryParams.stars.map((star: string) => parseInt(star))
            : parseInt(queryParams.stars);

        constructedQuery.starRating = { $in: starRatings };
    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }

    return constructedQuery;
};

export const getAllHotels = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        // 过滤筛选
        const query = constructSearchQuery(req.query);

        // 排序
        let sortOptions = {};
        switch (req.query.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 }; // 星级降序
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }

        // 分页
        const pageSize = 5; // 每页有几个酒店
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        ); // 当前在第几页
        const skip = (pageNumber - 1) * pageSize; // 跳过多少条酒店数据

        // 查数据库
        const hotelsList = await Hotel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);
        if (!hotelsList.toString()) {
            next(new AppError("Failed to find hotel!", 404));
        }
        const totalItems = await Hotel.countDocuments(query); // 酒店总量
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

export const getLatestHotels = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const hotels = await Hotel.find().sort("-lastUpdated");
        if (!hotels) {
            return next(new AppError("Can not find hotels", 404));
        }
        res.status(200).json(hotels);
    }
);

export const getHotelById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id.toString();

        const hotel = await Hotel.findById(id);

        if (!hotel) {
            return next(new AppError("Can not find hotel by this id.", 404));
        }

        res.status(200).json(hotel);
    }
);

export const createPaymentIntent = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("🔥 enter createPaymentIntent handler");
        const { numberOfNights } = req.body;
        const hotelId = req.params.hotelId;

        // 查询数据库获取酒店数据
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return next(new AppError("Can not find hotel by this id.", 404));
        }

        const totalCost = hotel.pricePerNight * numberOfNights;
        // console.log(totalCost);
        // 发给 Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCost * 100, // 总金额
            currency: "gbp", // 货币
            metadata: {
                hotelId,
                userId: req.userId,
            },
        });

        if (!paymentIntent.client_secret) {
            return next(new AppError("Error creating paymentIntent", 500));
        }

        // 返回给前端的数据
        const response = {
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            totalCost,
        };

        res.status(201).json(response);
    }
);

export const createBooking = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const paymentIntentId = req.body.paymentIntentId;

        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId as string
        );

        if (!paymentIntent) {
            return next(new AppError("payment intent not found", 400));
        }

        if (
            paymentIntent.metadata.hotelId !== req.params.hotelId ||
            paymentIntent.metadata.userId !== req.userId
        ) {
            return next(new AppError("payment intent mismatch", 400));
        }

        if (paymentIntent.status !== "succeeded") {
            return next(
                new AppError(
                    `payment intent not succeeded. Status: ${paymentIntent.status}`,
                    400
                )
            );
        }

        const newBooking: BookingType = {
            ...req.body,
            userId: req.userId,
        };
        console.log(newBooking);
        const hotel = await Hotel.findOneAndUpdate(
            { _id: req.params.hotelId },
            {
                $push: { bookings: newBooking },
            }
        );

        if (!hotel) {
            return next(new AppError("hotel not found", 400));
        }

        await hotel.save();
        res.status(200).send();
    }
);
