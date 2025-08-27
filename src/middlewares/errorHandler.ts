import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorCatch = error;
  console.log(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(500).json({ success: false, message: error.message });
  }

  return res
    .status(500)
    .json({ success: false, message: errorCatch ?? "Something went wrong" });
}
