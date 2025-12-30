import type { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

class UserController {
  private service = new UserService();

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId || req.params.id;
      const user = await this.service.getUserById(userId);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).userId || req.params.id;
      const data = req.body;
      const user = await this.service.updateUser(userId, data);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const skip = Number(req.query.skip) || 0;
      const take = Number(req.query.take) || 10;
      const result = await this.service.getAllUsers(skip, take);
      res.status(200).json(result);
    } catch (err: any) {
      next(err);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) throw new Error("User id is required");
      const user = await this.service.getUserById(id);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) throw new Error("User id is required");
      const result = await this.service.deleteUser(id);
      res.status(200).json(result);
    } catch (err: any) {
      next(err);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) throw new Error("User id is required");
      const user = await this.service.verifyEmail(id);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  }
}

export default new UserController();
