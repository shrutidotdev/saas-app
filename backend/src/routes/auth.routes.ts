import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import type { json } from "zod";


const prisma = new PrismaClient();

export class AuthService {
    async register(name: string, email: string, password: string)  {

        const existingUser = await prisma.user.findUnique({ where : { email}})
    }
}