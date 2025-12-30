import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", (req, res, next) => authController.register(req, res, next));
router.post("/login", (req, res, next) => authController.login(req, res, next));
router.post("/refresh-token", (req, res, next) => authController.refreshToken(req, res, next));

export default router;