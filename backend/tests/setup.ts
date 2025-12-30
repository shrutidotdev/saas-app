process.env.JWT_SECRET = "test-secret";
process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
process.env.JWT_EXPIRES_IN = "1h";
process.env.JWT_REFRESH_EXPIRES_IN = "7d";
process.env.NODE_ENV = "test";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test_db";

// Global test setup
beforeAll(async () => {
  // Setup global test configurations
  console.log("setting up tests...");
});

afterAll(async () => {
  // Cleanup after all tests
  console.log("tearing down tests...");
});

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});