import { NextFunction, Request, Response } from "express";
import { signInSchema, signUpSchema } from "../utils/schema/user";
import fs from "fs";
import * as userService from "../services/userService";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "Photo is required" });
    }

    const parse = signUpSchema.safeParse(req.body);
    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      fs.unlinkSync(req.file.path);

      return res
        .status(400)
        .json({ success: false, error: "Invalid data", details: errorMessage });
    }

    const newUser = await userService.signUp(parse.data, req.file);

    return res.json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = signInSchema.safeParse(req.body);
    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res
        .status(400)
        .json({ success: false, error: "Invalid data", details: errorMessage });
    }

    const user = await userService.signIn(parse.data);

    return res.json({
      success: true,
      message: "User signed in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
