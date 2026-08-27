import { issueSchema } from "@repo/common";
import type { Request, Response } from "express";
import { ApiError } from "../utilis/apiError";
import { prisma } from "@repo/db";
import { ApiResponse } from "../utilis/apiResponse";

export const createIssue = async (req: Request, res: Response) => {
  const { success, data } = issueSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json(new ApiError("INVALID_REQUEST"));
  }

  const { title, description } = data;

  const sectionId = req.params.sectionId as string;

  const section = await prisma.section.findUnique({
    where: {
      id: sectionId,
    },
  });

  if (!section) {
    return res.status(403).json(new ApiError("NOT_A_MEMBER"));
  }

  const issue = await prisma.issue.create({
    data: {
      title,
      description,
      boardId: section.boardId,
      sectionId,
    },
  });
  return res.status(201).json(new ApiResponse({ section }));
};

export const getIssues = async (req: Request, res: Response) => {
  const issues = await prisma.issue.findMany({
    where: {
      sectionId: req.params.sectionId as string,
    },
  });

  if (!issues) {
    return res.status(400).json(new ApiError("INVALID_REQUEST"));
  }

  return res.json(new ApiResponse({ issues }));
};
