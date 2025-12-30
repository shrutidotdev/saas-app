import dotenv from "dotenv";

dotenv.config();

export const config = {
  database: {
    url: process.env.DATABASE_URL || "postgresql://localhost:5432/saas_app",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "default-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    refreshSecret: process.env.JWT_REFRESH_TOKEN || "default-refresh-secret",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
  server: {
    port: parseInt(process.env.PORT || "3000"),
    nodeEnv: process.env.NODE_ENV || "development",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },
  polar: {
    apiKey: process.env.POLAR_API_KEY,
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET,
  },
};
