import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
const validator = require("validator");

//--------------------------------------------------
// 1. 基本字段（纯数据结构）
//--------------------------------------------------
export interface IUser {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

//--------------------------------------------------
// 2. 文档实例类型（字段 + Mongoose Document）
//--------------------------------------------------
export interface IUserDoc extends IUser, Document {
    correctPassword(candidate: string, stored: string): Promise<boolean>;
    changedPasswordAfter(decodedIat: number): boolean;
}

//--------------------------------------------------
// 3. schema 定义
//--------------------------------------------------
const userSchema = new mongoose.Schema<IUserDoc>(
    {
        email: {
            type: String,
            required: [true, "Please tell us your email!"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        password: {
            type: String,
            select: false, // 默认查询不返回密码
            required: [true, "Please tell us your password"],
            minlength: 8,
        },
        firstname: {
            type: String,
            required: [true, "Please tell us your firstname!"],
        },
        lastname: {
            type: String,
            required: [true, "Please tell us your lastname!"],
        },
        // passwordChangedAt: Date,
        // passwordResetToken: String,
        // passwordResetExpires: Date,
    },
    { timestamps: true }
);

//--------------------------------------------------
// 4. 中间件 & 实例方法
//--------------------------------------------------
userSchema.pre<IUserDoc>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (
    candidate: string, // candidate is the unbcrypt password from user input
    stored: string // store is the bcrypt password from database
) {
    return bcrypt.compare(candidate, stored);
};

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
//     if (this.passwordChangedAt) {
//         const changedTime = Math.floor(this.passwordChangedAt.getTime() / 1000);
//         return changedTime > JWTTimestamp;
//     }
//     return false;
// };

//--------------------------------------------------
// 5. model 导出
//--------------------------------------------------
const User: Model<IUserDoc> = mongoose.model<IUserDoc>("User", userSchema);
export default User;
