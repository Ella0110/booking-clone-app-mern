/**
 * 统一封装业务可预期错误：
 * - `statusCode`：HTTP 状态码
 * - `status`：'fail'（4xx）| 'error'（5xx）
 * - `isOperational`：标记是否可预期，便于全局错误处理中区分
 */
export default class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: "fail" | "error";
    public readonly isOperational = true;

    constructor(message: string, statusCode: number) {
        super(message);

        this.name = this.constructor.name; // 保留类名
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith("4") ? "fail" : "error";

        // 记录栈信息，但不包含本构造函数，可以将 err.stack 通过这种方式返回给 errHandler
        Error.captureStackTrace(this, this.constructor);
    }
}
