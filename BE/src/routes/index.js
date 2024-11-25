import { Router } from "express";
import authRouter from "./AuthRouter.js";
import categoryRouter from "./products/CategoryRouter.js";

const router = Router();
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
export default router;
