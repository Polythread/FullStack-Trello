import type { Request, Response } from "express";
import { loginSchema, signupSchema } from "@repo/common";
import { ApiError } from "../utilis/apiError";
import { prisma } from "@repo/db";
import bcrypt from "bcrypt";
import { ApiResponse } from "../utilis/apiResponse";
import jwt from "jsonwebtoken";

export const handleSignup = async (req: Request, res: Response) => {
  const { success, data } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json(new ApiError("INVALID_REQUEST"));
  }

  const { email, password } = data;

  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    return res.status(400).json(new ApiError("EMAIL_ALREADY_EXISTS"));
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPass,
    },
    omit: {
      password: true,
    },
  });

  return res.status(201).json(new ApiResponse(user));
};

export const handleLogin = async (req: Request, res: Response) => {
  const { success, data } = loginSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json(new ApiError("INVALID_REQUEST"));
  }

  const { email, password } = data;

  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExist) {
    return res.status(400).json(new ApiError("INVALID_CREDENTIALS"));
  }

  const checkPass = await bcrypt.compare(password, userExist.password);

  if (!checkPass) {
    return res.status(400).json(new ApiError("INVALID_CREDENTIALS"));
  }

  const token = jwt.sign(
    {
      id: userExist.id,
    },
    process.env.JWT_SECRET!,
  );

  return res.status(200).json(new ApiResponse({ token }));
};
