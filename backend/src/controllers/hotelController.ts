import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/type";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export const createMyHotel = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        if (!newHotel) {
            throw new AppError("req body is empty", 400);
        }

        // 1. upload the image to cloudinary

        // 2. if upload was successiful, add the url to the new hotel
        const imageUrls = await uploadImages(imageFiles);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        // 3. save the new hotel to our database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        // 4. return a 201 status
        res.status(201).json({ data: hotel });
    }
);
