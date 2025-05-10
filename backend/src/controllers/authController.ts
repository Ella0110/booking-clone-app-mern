import { NextFunction, Request, Response } from "express";
import User, { IUserDoc } from "../models/user";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";

//--------------------------------------------------
// 类型辅助
//--------------------------------------------------
const JWT_SECRET: Secret =
    process.env.JWT_SECRET ??
    (() => {
        throw new Error("JWT_SECRET is not defined in env");
    })();

const JWT_EXPIRES_IN: SignOptions["expiresIn"] = (process.env.JWT_EXPIRES_IN ??
    "1h") as SignOptions["expiresIn"];

const JWT_COOKIE_EXPIRES_IN_MIN = Number(
    process.env.JWT_COOKIE_EXPIRES_IN ?? 60
);

//--------------------------------------------------
// 工具函数
//--------------------------------------------------
const signToken = (id: string) =>
    jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const createSendToken = (user: IUserDoc, statusCode: number, res: Response) => {
    // 生成 token
    const token = signToken(user.id.toString());
    // 生成 cookie
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN_MIN * 60 * 1000),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });
    // 返回时删除 password，不显示给用户
    const userObj = user.toObject(); // plain JS object
    delete userObj.password;
    // 返回数据
    res.status(statusCode).json({
        status: "success",
        token,
        data: { user },
    });
};

//--------------------------------------------------
// 路由处理函数
//--------------------------------------------------
export const register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            // passwordConfirm: req.body.passwordConfirm,
            // role: req.body.role,
        });

        createSendToken(newUser, 201, res);
    }
);
