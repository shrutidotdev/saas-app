import UserController from "../../src/controllers/user.controller";
import { UserService } from "../../src/services/user.service";

jest.mock("../../src/services/user.service");

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getProfile should return 200 and user", async () => {
    const mockUser = { id: "1", name: "Test", email: "t@test.com" };
    (UserService as jest.MockedClass<typeof UserService>).prototype.getUserById = jest.fn().mockResolvedValue(mockUser as any);

    const req: any = { params: {}, body: {}, userId: "1" };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res: any = { status };
    const next = jest.fn();

    await UserController.getProfile(req, res, next);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(mockUser);
  });
});
