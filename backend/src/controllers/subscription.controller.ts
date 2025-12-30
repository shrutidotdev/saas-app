import type { Request, Response, NextFunction } from "express";
import { SubscriptionService } from "../services/subscription.service";

class SubscriptionController {
  private service = new SubscriptionService();

  async createSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { tier } = req.body;
      const subscription = await this.service.createSubscription(userId, tier);
      res.status(201).json(subscription);
    } catch (err: any) {
      next(err);
    }
  }

  async getMySubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const subscription = await this.service.getSubscription(userId);
      res.status(200).json(subscription);
    } catch (err: any) {
      next(err);
    }
  }

  async upgradeTier(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { tier } = req.body;
      const subscription = await this.service.upgradeTier(userId, tier);
      res.status(200).json(subscription);
    } catch (err: any) {
      next(err);
    }
  }

  async cancelSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const subscription = await this.service.cancelSubscription(userId);
      res.status(200).json(subscription);
    } catch (err: any) {
      next(err);
    }
  }

  async updatePolarDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId;
      const { polarCustomerId, polarSubscriptionId } = req.body;
      const subscription = await this.service.updatePolarDetails(
        userId,
        polarCustomerId,
        polarSubscriptionId
      );
      res.status(200).json(subscription);
    } catch (err: any) {
      next(err);
    }
  }
}

export default new SubscriptionController();
