import express from "express";
import multer from "multer";
import {
    createMyHotel,
    getMyHotel,
    getMyHotelById,
    updateMyHotelById,
} from "../controllers/myHotelController";
import verifyToken from "../middleware/auth";
import { hotelValidate, validate } from "../shared/validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB for max
    },
});
router.post(
    "/",
    verifyToken, // 验证登录，获取 userId
    upload.array("imageFiles", 6), // 这里的 imageFiles 是前端表单名称，6 是 6 张图片
    hotelValidate, // express-validator 数据验证
    validate, // 获取上一步的报错信息，报 error
    createMyHotel
);

router.get(
    "/",
    verifyToken, // 验证登录，获取 userId
    getMyHotel
);

router.get(
    "/:id",
    verifyToken, // 验证登录，获取 userId
    getMyHotelById
);

router.put(
    "/:id",
    verifyToken, // 验证登录，获取 userId
    upload.array("imageFiles", 6), // 这里的 imageFiles 是前端表单名称，6 是 6 张图片
    hotelValidate, // express-validator 数据验证
    validate, // 获取上一步的报错信息，报 error
    updateMyHotelById
);

export default router;
