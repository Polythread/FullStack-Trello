import { orgSchema } from "@repo/common";
import type { Request, Response } from "express";
import { ApiError } from "../utilis/apiError";
import { prisma } from "@repo/db";
import { ApiResponse } from "../utilis/apiResponse";

export const createOrg = async (req: Request, res: Response) => {
  const { success, data } = orgSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json(new ApiError("INVALID_REQUEST"));
  }

  const { name, description } = data;

  const organization = await prisma.organization.create({
    data: {
      name,
      description,
      memberships: {
        create: {
          userId: req.user.id,
          role: "Admin",
        },
      },
    },
  });

  return res.status(200).json(new ApiResponse({ organization }));
};
