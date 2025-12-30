import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

class AuthController {
  private service = new AuthService();

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const result = await this.service.register(name, email, password);
      res.status(201).json(result);
    } catch (err: any) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.service.login(email, password);
      res.status(200).json(result);
    } catch (err: any) {
      next(err);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await this.service.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (err: any) {
      next(err);
    }
  }
}

export default new AuthController();
