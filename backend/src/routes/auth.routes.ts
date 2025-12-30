import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

import { body } from "express-validator";
import { validate } from "../middleware/validate.middleware";

router.post(
  "/register",
  validate([
    body("name").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ]),
  (req, res, next) => authController.register(req, res, next)
);

router.post(
  "/login",
  validate([body("email").isEmail(), body("password").isString().notEmpty()]),
  (req, res, next) => authController.login(req, res, next)
);

router.post(
  "/refresh-token",
  validate([body("refreshToken").isString().notEmpty()]),
  (req, res, next) => authController.refreshToken(req, res, next)
);

export default router;