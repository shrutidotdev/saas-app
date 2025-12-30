import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import type { json } from "zod";

const prisma = new PrismaClient();

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
  };

  async login (email : string , password: string){
    const user = await prisma.user.findUnique({ where : { email }});

    if(!user) {
        throw new Error("Invalid email or passowrd");
    }

    const token = this.generateToken(user.id);
    await this.saveRefreshToken(user.id, token.refreshToken);

    return {
        user: { id: user.id , name: user.name, email: user.email },
        ...token
    }
  }
  generateToken(userId: string) {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN!,
      algorithm: "HS256",
    });

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_TOKEN!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
      algorithm: "HS256",
    });

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
        process.env.JWTREFRESH_TOKEN!
      ) as { userId: string };
      const tokenRecord = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        throw new Error("Invalid or expired referesh token");
      }

      const newAccessToken = jwt.sign(
        { userId: decode.userId },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN!, algorithm: "HS256" }
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }
}
