import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware";
import { createIssue, getIssues } from "../controllers/issue.controller";

const router = Router();

router.post("/:sectionId", verifyUser, createIssue);
router.get("/:sectionId", verifyUser, getIssues);

export default router;
