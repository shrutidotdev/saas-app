import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

export const validate = (chains: ValidationChain[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Promise.all(chains.map((chain) => chain.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};
