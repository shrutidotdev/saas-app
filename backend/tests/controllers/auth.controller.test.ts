// backend/tests/services/auth.service.test.ts
import { AuthService } from '../../src/services/auth.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/config/database';

// Mock the dependencies
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../src/config/database', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    refreshToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();  // This comes from setup.ts, but we repeat it here for safety
  });

  describe('register', () => {
    it('should create a new user successfully', async () => {
      // Arrange
      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed123'
      };

      // Mock the database calls
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed123');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce('access-token-123')
        .mockReturnValueOnce('refresh-token-123');

      // Act
      const result = await authService.register(
        'John Doe',
        'john@example.com',
        'password123'
      );

      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' }
      });
      expect(result.user.email).toBe('john@example.com');
      expect(result.accessToken).toBe('access-token-123');
    });

    it('should throw error if user already exists', async () => {
      // Arrange
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'john@example.com'
      });

      // Act & Assert
      await expect(
        authService.register('John Doe', 'john@example.com', 'password123')
      ).rejects.toThrow('User already exists');
    });
  });
});