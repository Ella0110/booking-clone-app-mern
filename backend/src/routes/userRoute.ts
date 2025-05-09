import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();
console.log(process.env.JWT_SECRET_KEY as string);
// router.post("/register", async (req: Request, res: Response) => {
//     // try catch 重复写不好，最好写一个 errorhandler
//     try {
//         // 这里应该可以不用查找一遍，因为 mongoose 有 unique 的特性，会自己判断是否重复
//         let user = await User.findOne({ email: req.body.email });

//         if (user) {
//             return res.status(400).json({
//                 message: "User already exists",
//             });
//         }
//         // 这里 create 最好还是不要直接用 body，分开写，防止别人写其他字段破坏数据库
//         user = new User(req.body);
//         await user.save();

//         const token = jwt.sign(
//             { userID: user.id },
//             process.env.JWT_SECRET_KEY as string,
//             {
//                 expiresIn: process.env.JWT_EXPIRES_IN,
//             }
//         );
//         res.cookie("auth_token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             maxAge: 86400000,
//         });
//         res.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went very wrong" });
//     }
// });

export default router;
