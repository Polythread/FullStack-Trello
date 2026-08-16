import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utilis/apiError";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(new ApiError("UNAUTHORIZED"));
  }

  try {
    const decoded = jwt.verify(token, "secret") as { id: string };

    req.user = { id: decoded.id };

    next();
  } catch (err) {
    return res.status(401).json(new ApiError("UNAUTHORIZED"));
  }
};
