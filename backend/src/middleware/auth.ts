import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["jwt"];
    console.log(token);
    if (!token) {
        res.status(401).json({ message: "unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.id = (decoded as JwtPayload).id;
        next();
    } catch (error) {
        res.status(401).json({ message: "unauthorized" });
    }
};

export default verifyToken;
