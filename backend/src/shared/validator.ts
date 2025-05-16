import { body, check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

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
        .isNumeric() // 确保他是数字
        .withMessage("Price per night is required and must be a number"),
    body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
];

export const registerValidate = [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
        min: 8,
    }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

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
    }

    next();
};
