import { boardSchema } from "@repo/common";
import type { Request, Response } from "express";
import { ApiError } from "../utilis/apiError";
import { prisma } from "@repo/db";
import { ApiResponse } from "../utilis/apiResponse";

export const createBoard = async (req: Request, res: Response) => {
  const { success, data } = boardSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json(new ApiError("INVALID_REQUEST"));
  }

  const { title } = data;
  const orgId = req.params.orgId as string;

  const membership = await prisma.membership.findUnique({
    where: {
      userId_orgId: {
        userId: req.user.id,
        orgId,
      },
      role: "Admin",
    },
  });

  if (!membership) {
    return res
      .status(400)
      .json(
        new ApiError("Either the org does not exist or you are not the admin"),
      );
  }

  const board = await prisma.board.create({
    data: {
      title,
      orgId,
    },
  });

  return res.status(200).json(new ApiResponse({ board }));
};

export const getBoards = async (req: Request, res: Response) => {
  const board = await prisma.board.findMany({
    where: {
      orgId: req.params.orgId as string,
    },
  });

  return res.json(new ApiResponse({ board }));
};