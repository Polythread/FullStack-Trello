import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware";
import { createBoard } from "../controllers/board.controller";

const router = Router();

router.post("/:orgId", verifyUser, createBoard);

export default router;
