import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware";
import { createSection, getSections } from "../controllers/section.controller";

const router = Router();

router.post("/:boardId", verifyUser, createSection);
router.get("/:boardId", verifyUser, getSections);

export default router;
