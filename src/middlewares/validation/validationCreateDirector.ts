import type { Request, Response, NextFunction } from "express";
import { AppError } from "../appError.js";

export default function validationCreateDirector(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name } = req.body;
  if (!name) {
    throw new AppError("Name is required", 400);
  }
  if (typeof name !== "string") {
    throw new AppError("Name must be a string", 400);
  }
  if (name.length < 3 || name.length > 50) {
    throw new AppError("Name size must be between 3 and 50", 400);
  }
  next();
}
