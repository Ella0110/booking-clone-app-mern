import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

/** 扩展 Express 默认 Error，补充我们常用的属性 */
interface ExtendedError extends Error {
    statusCode?: number;
    status?: "fail" | "error";
    isOperational?: boolean;
    code?: number; // Mongo duplicate key
    keyValue?: Record<string, unknown>; // Mongo duplicate key
    path?: string; // CastError
    value?: unknown; // CastError
}

//--------------------------------------------------
// 1. 数据库／JWT 错误专用处理器
//--------------------------------------------------
const handleCastErrorDB = (err: ExtendedError): AppError => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: ExtendedError): AppError => {
    const key = Object.keys(err.keyValue ?? {})[0];
    const message = `Duplicate field value: { ${key}: ${err.keyValue?.[key]} }. Please use another value`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err: ExtendedError): AppError =>
    new AppError(`Invalid input data. ${err.message}`, 400);

const handleJWTError = (): AppError =>
    new AppError("Invalid token. Please login again.", 401);

const handleTokenExpiredError = (): AppError =>
    new AppError("Token has expired. Please login again.", 401);

//--------------------------------------------------
// 2. 开发 / 生产环境响应格式
//--------------------------------------------------
const sendErrorDev = (err: ExtendedError, res: Response): void => {
    res.status(err.statusCode ?? 500).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err: ExtendedError, res: Response): void => {
    if (err.isOperational) {
        // 可信业务错误
        res.status(err.statusCode!).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // 编码或未知错误，隐藏细节
        console.error("ERROR 💥", err);
        res.status(500).json({
            status: "error",
            message: "Something went very wrong",
        });
    }
};

//--------------------------------------------------
// 3. Util：浅拷贝 Error 所有自有属性
//--------------------------------------------------
const copyError = <T extends object>(err: T): T =>
    Object.getOwnPropertyNames(err).reduce((acc, key) => {
        // @ts-expect-error 动态复制
        acc[key] = err[key];
        return acc;
    }, {} as T);

//--------------------------------------------------
// 4. 全局错误处理中间件（默认导出）
//--------------------------------------------------
export default (
    err: ExtendedError,
    _req: Request,
    res: Response,
    next: NextFunction
): void => {
    err.statusCode = err.statusCode ?? 500;
    err.status = err.status ?? "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
        console.log("error dev");
    } else {
        console.log("error pro");
        // 生产环境
        let error: ExtendedError = copyError(err);
        error.message = err.message; // 必须显式保留 message
        console.log(error);
        // 针对不同错误类型转成 AppError
        if (error.name === "CastError") error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === "ValidationError")
            error = handleValidationErrorDB(error);
        if (error.name === "JsonWebTokenError") error = handleJWTError();
        if (error.name === "TokenExpiredError")
            error = handleTokenExpiredError();

        sendErrorProd(error, res);
    }

    next();
};
