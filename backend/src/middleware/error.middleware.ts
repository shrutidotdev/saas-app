import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack || err);

  const status = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production" && status >= 500
      ? "Internal Server Error"
      : err.message || "Unknown Error";

  res.status(status).json({ error: message });
};
