import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware";
import { createOrg } from "../controllers/org.controller";

const router = Router();

router.post("/", verifyUser, createOrg);

export default router;
