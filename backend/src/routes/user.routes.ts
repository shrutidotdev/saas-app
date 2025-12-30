import express from "express";
import userController from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/me", authenticate, (req, res, next) => userController.getProfile(req, res, next));
import { body } from "express-validator";
import { validate } from "../middleware/validate.middleware";

router.put(
  "/me",
  authenticate,
  validate([body("name").optional().isString(), body("email").optional().isEmail()]),
  (req, res, next) => userController.updateProfile(req, res, next)
);
router.get("/", authenticate, (req, res, next) => userController.getAllUsers(req, res, next));
router.get("/:id", authenticate, (req, res, next) => userController.getUserById(req, res, next));
router.delete("/:id", authenticate, (req, res, next) => userController.deleteUser(req, res, next));
router.post("/:id/verify", (req, res, next) => userController.verifyEmail(req, res, next));

export default router;
