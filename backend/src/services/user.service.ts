import prisma from "../config/database";

export class UserService {
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async updateUser(userId: string, data: { name?: string; email?: string }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    return user;
  }

  async getAllUsers(skip: number = 0, take: number = 10) {
    const users = await prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    const total = await prisma.user.count();

    return {
      users,
      total,
      pages: Math.ceil(total / take),
    };
  }

  async deleteUser(userId: string) {
    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: "User deleted successfully" };
  }

  async verifyEmail(userId: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });

    return user;
  }
}
