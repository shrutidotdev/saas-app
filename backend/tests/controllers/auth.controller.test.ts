import AuthController from "../../src/controllers/auth.controller";
import { AuthService } from "../../src/services/auth.service";

// mock the service methods
jest.mock("../../src/services/auth.service");

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("register should return 201 and payload", async () => {
    const mockResult = { user: { id: "1", name: "Test", email: "t@test.com" }, accessToken: "a", refreshToken: "r" };
    (AuthService as jest.MockedClass<typeof AuthService>).prototype.register = jest.fn().mockResolvedValue(mockResult as any);

    const req: any = { body: { name: "Test", email: "t@test.com", password: "secret" } };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res: any = { status };
    const next = jest.fn();

    await AuthController.register(req, res, next);
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(mockResult);
  });

  test("login should return 200 and payload", async () => {
    const mockResult = { user: { id: "1", name: "Test", email: "t@test.com" }, accessToken: "a", refreshToken: "r" };
    (AuthService as jest.MockedClass<typeof AuthService>).prototype.login = jest.fn().mockResolvedValue(mockResult as any);

    const req: any = { body: { email: "t@test.com", password: "secret" } };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res: any = { status };
    const next = jest.fn();

    await AuthController.login(req, res, next);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(mockResult);
  });

  test("refreshToken should return 200 and payload", async () => {
    const mockResult = { accessToken: "a" };
    (AuthService as jest.MockedClass<typeof AuthService>).prototype.refreshToken = jest.fn().mockResolvedValue(mockResult as any);

    const req: any = { body: { refreshToken: "r" } };
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res: any = { status };
    const next = jest.fn();

    await AuthController.refreshToken(req, res, next);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(mockResult);
  });
});
