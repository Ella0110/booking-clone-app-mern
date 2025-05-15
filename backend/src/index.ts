import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DB = (process.env.MONGO_CONNECTION_STRING as string).replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD as string
);
mongoose.connect(DB).then(() => {
    console.log(
        "DB connection successful: ",
        process.env.MONGO_CONNECTION_STRING
    );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server running on localhost: ${PORT}`);
});
