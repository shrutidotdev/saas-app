import express from "express";
import subscriptionController from "../controllers/subscription.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

import { body } from "express-validator";
import { validate } from "../middleware/validate.middleware";

router.post(
  "/",
  authenticate,
  validate([body("tier").optional().isIn(["FREE", "PRO", "ENTERPRISE"])]),
  (req, res, next) => subscriptionController.createSubscription(req, res, next)
);
router.get("/me", authenticate, (req, res, next) => subscriptionController.getMySubscription(req, res, next));
router.put(
  "/upgrade",
  authenticate,
  validate([body("tier").isIn(["FREE", "PRO", "ENTERPRISE"])]),
  (req, res, next) => subscriptionController.upgradeTier(req, res, next)
);
router.post("/cancel", authenticate, (req, res, next) => subscriptionController.cancelSubscription(req, res, next));
router.post(
  "/polar",
  authenticate,
  validate([
    body("polarCustomerId").isString().notEmpty(),
    body("polarSubscriptionId").isString().notEmpty(),
  ]),
  (req, res, next) => subscriptionController.updatePolarDetails(req, res, next)
);

export default router;
