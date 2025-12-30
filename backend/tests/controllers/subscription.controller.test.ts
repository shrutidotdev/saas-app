import SubscriptionController from "../../src/controllers/subscription.controller";
import { SubscriptionService } from "../../src/services/subscription.service";

jest.mock("../../src/services/subscription.service");

describe("SubscriptionController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getMySubscription should return 200 and subscription", async () => {
    const mockSub = { id: "1", userId: "1", tier: "FREE" };
    (SubscriptionService as jest.MockedClass<typeof SubscriptionService>).prototype.getSubscription = jest.fn().mockResolvedValue(mockSub as any);

    const req: any = { params: {}, body: {}, userId: "1" };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res: any = { status };
    const next = jest.fn();

    await SubscriptionController.getMySubscription(req, res, next);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(mockSub);
  });
});
