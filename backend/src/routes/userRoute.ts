import express from "express";
import {
    logout,
    register,
    signin,
    validateToken,
    getMe,
} from "../controllers/authController";
import verifyToken from "../middleware/auth";
import { registerValidate, validate } from "../shared/validator";

const router = express.Router();
router.post("/register", registerValidate, validate, register);
router.post("/signin", signin);
router.get("/validate-token", verifyToken, validateToken);
router.post("/logout", logout);
router.get("/me", verifyToken, getMe);
export default router;
