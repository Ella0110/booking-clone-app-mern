import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/userRoute";
import globalErrorHandler from "./controllers/errorController";
import cookieParser from "cookie-parser";
import myHotelRoute from "./routes/myHotelRoute";
import hotelRoute from "./routes/hotelRoute";
import myBookingRoute from "./routes/myBookingRoute";
import path from "path";

const app = express();
app.use(cookieParser());
// 自动将 API 请求的 body 转换为 json
app.use(express.json({ limit: "50mb" }));
// 解析 Content-Type: application/x-www-form-urlencoded的请求，将其转换为 object，可以通过 req.body 获取
app.use(express.urlencoded({ extended: true }));

// 允许在网络上的任何位置访问所有路由
app.use(
    cors({
        // 让我们的服务器只接收这个链接的请求，并且这个 URL 必须携带 credentials，也就是要有 cookies
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
// API
app.use("/api/user", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/my-hotels", myHotelRoute);
app.use("/api/my-bookings", myBookingRoute);

app.use(globalErrorHandler);

export default app;
