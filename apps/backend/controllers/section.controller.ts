import { sectionSchema } from "@repo/common";
import type { Request, Response } from "express";
import { ApiError } from "../utilis/apiError";
import { prisma } from "@repo/db";
import { ApiResponse } from "../utilis/apiResponse";

export const createSection = async (req: Request, res: Response) => {
  const boardId = req.params.boardId as string;

  const { success, data } = sectionSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json(new ApiError("INVALID_REQUEST"));
  }

  const { title } = data;

  const board = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return res.status(404).json(new ApiError("INVALID_BOARD_ID"));
  }

  const section = await prisma.section.create({
    date: {
      title,
      boardId,
    },
  });

  return res.status(201).json(new ApiResponse(section));
};

export const getSections = async (req: Request, res: Response) => {
  const sections = await prisma.section.findMany({
    where: {
      boardId: req.params.boardId as string,
    },
  });

  return res.json(new ApiResponse({ sections }));
};
