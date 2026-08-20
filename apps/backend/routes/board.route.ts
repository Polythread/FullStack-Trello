import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware";
import { createBoard, getBoards } from "../controllers/board.controller";

const router = Router();

router.post("/:orgId", verifyUser, createBoard);
router.get("/:orgId", verifyUser, getBoards);

export default router;
