import { NextFunction, Request, Response } from "express";
import User, { IUserDoc } from "../models/user";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

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
        data: { userObj },
    });
};

//--------------------------------------------------
// 路由处理函数
//--------------------------------------------------
// /api/user/register POST
export const register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        // let newUser;
        try {
            const newUser = await User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                // passwordConfirm: req.body.passwordConfirm,
                // role: req.body.role,
            });
            createSendToken(newUser, 201, res);
        } catch (error) {
            if ((error as any).code === 11000) {
                const message = `User already exists, Please use another email to register`;
                throw new AppError(message, 400);
            }
        }
    }
);

export const signin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        // 先查 email 和 password 是否在 req.body 中
        const { email, password } = req.body;
        if (!email || !password) {
            return next(
                new AppError("Please provide email and password.", 400)
            );
        }
        // 查询用户是否存在于数据库，密码是否正确
        const user = await User.findOne({ email }).select("+password");
        console.log(user);
        console.log("password", password);
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError("Incorrect email or password.", 401));
        }
        // 如果都没什么问题，发送 token
        createSendToken(user, 200, res);
    }
);

export const validateToken = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send({ userId: req.userId });
    }
);

export const logout = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        res.cookie("jwt", "", {
            expires: new Date(0),
        });
        res.send();
    }
);
