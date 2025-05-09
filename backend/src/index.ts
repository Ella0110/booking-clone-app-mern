import express, { Request, Response } from "express";
// import type  from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

console.log(process.env.JWT_SECRET_KEY);
const DB = (process.env.MONGO_CONNECTION_STRING as string).replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD as string
);
console.log(DB);
mongoose.connect(DB).then(() => {
    console.log("DB connection successful");
});

const app = express();

// 自动将 API 请求的 body 转换为 json
app.use(express.json());
// 解析 Content-Type: application/x-www-form-urlencoded的请求，将其转换为 object，可以通过 req.body 获取
app.use(express.urlencoded({ extended: true }));
// 允许在网络上的任何位置访问所有路由
app.use(cors());

app.use("/api/user", userRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server running on localhost: ${PORT}`);
});
