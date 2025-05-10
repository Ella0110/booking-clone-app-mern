import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const DB = (process.env.MONGO_CONNECTION_STRING as string).replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD as string
);
mongoose.connect(DB).then(() => {
    console.log("DB connection successful");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server running on localhost: ${PORT}`);
});
