import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/type";
import catchAsync from "../utils/catchAsync";

export const createMyHotel = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        // 1. upload the image to cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64"); // 一个包含整个图片内容的 Base64 字符串
            let dataURI = "data:" + image.mimetype + ";base64," + b64; // Data URI：<img src="data:image/png;base64,${b64}">，在网页中直接嵌入图像。
            const res = await cloudinary.v2.uploader.upload(dataURI); // 上传到 cloudinary，获取 url
            return res.url;
        });

        // 2. if upload was successiful, add the url to the new hotel
        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        // 3. save the new hotel to our database
        const hotel = new Hotel(newHotel);
        await hotel.save();
        // 4. return a 201 status
        res.status(201).send(hotel);
    }
);
