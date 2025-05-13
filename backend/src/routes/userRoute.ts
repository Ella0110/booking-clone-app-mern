import express from "express";
import { register, signin, validateToken } from "../controllers/authController";
import verifyToken from "../middleware/auth";

const router = express.Router();
router.post("/register", register);
router.post("/signin", signin);
router.get("/validate-token", verifyToken, validateToken);

export default router;
