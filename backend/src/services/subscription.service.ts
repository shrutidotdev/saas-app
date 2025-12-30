import prisma from "../config/database";
import { SubscriptionTier } from "@prisma/client";

export class SubscriptionService {
  async createSubscription(userId: string, tier: SubscriptionTier = "FREE") {
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (existingSubscription) {
      throw new Error("User already has a subscription");
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        tier,
      },
    });

    return subscription;
  }

  async getSubscription(userId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    return subscription;
  }

  async upgradeTier(userId: string, tier: SubscriptionTier) {
    const subscription = await prisma.subscription.update({
      where: { userId },
      data: { tier },
    });

    return subscription;
  }

  async cancelSubscription(userId: string) {
    const subscription = await prisma.subscription.update({
      where: { userId },
      data: { tier: "FREE" },
    });

    return subscription;
  }

  async getSubscriptionByCustomerId(polarCustomerId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { polarCustomerId },
    });

    return subscription;
  }

  async updatePolarDetails(
    userId: string,
    polarCustomerId: string,
    polarSubscriptionId: string
  ) {
    const subscription = await prisma.subscription.update({
      where: { userId },
      data: {
        polarCustomerId,
        polarSubscriptionId,
      },
    });

    return subscription;
  }
}
