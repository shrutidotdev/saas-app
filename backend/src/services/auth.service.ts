import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/database";
import { config } from "../config/env";

export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const haspedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: haspedPassword,
      },
    });

    const token = this.generateToken(user.id);

    await this.saveRefreshToken(user.id, token.refreshToken);

    return {
      user: { id: user.id, name: user.name, email: user.email },
      ...token,
    };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or passowrd");
    }

    const token = this.generateToken(user.id);
    await this.saveRefreshToken(user.id, token.refreshToken);

    return {
      user: { id: user.id, name: user.name, email: user.email },
      ...token,
    };
  }
  generateToken(userId: string) {
    const accessToken = jwt.sign(
      { userId },
      config.jwt.secret as jwt.Secret,
      {
        expiresIn: config.jwt.expiresIn as string,
        algorithm: "HS256",
      }
    );

    const refreshToken = jwt.sign(
      { userId },
      config.jwt.refreshSecret as jwt.Secret,
      {
        expiresIn: config.jwt.refreshExpiresIn as string,
        algorithm: "HS256",
      }
    );

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: string, token: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      const decode = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret!
      ) as { userId: string };
      const tokenRecord = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        throw new Error("Invalid or expired refresh token");
      }

      const newAccessToken = jwt.sign(
        { userId: decode.userId },
        config.jwt.secret!,
        {
          expiresIn: config.jwt.expiresIn as string,
          algorithm: "HS256",
        }
      );

      return { accessToken: newAccessToken };
    } catch (error: any) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}
