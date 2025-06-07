import { body, check, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";

type ValidationResultError = {
    [string: string]: [string];
};

export const hotelValidate = [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
        .notEmpty()
        .isNumeric() // 确保它是数字
        .withMessage("Price per night is required and must be a number"),
    body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
];

export const registerValidate = [
    check("firstname", "First Name is required").isString(),
    check("lastname", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
        min: 8,
    }),
];

export const getHotelByIdValidate = [
    param("id").notEmpty().withMessage("Hotel ID is required"),
];

export const validate = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        // console.log(errors);
        if (!errors.isEmpty()) {
            // Group errors by field name
            const validationErrors: ValidationResultError = {};

            errors.array().forEach((error) => {
                if (error.type === "field") {
                    // error is FieldValidationError
                    validationErrors[error.path] = error.msg;
                }
            });

            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationErrors,
            });
            console.log("sending 400 from validate");
            return;
        }

        next();
    }
);
