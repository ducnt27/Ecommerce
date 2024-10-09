import { Router } from "express";
import authRouter from "./AuthRouter.js";

const router = Router();
router.use("/auth", authRouter);

export default router;