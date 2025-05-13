import express from "express";
import { register, login, validateToken } from "../controllers/authController";
import verifyToken from "../middleware/auth";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", verifyToken, validateToken);

export default router;
