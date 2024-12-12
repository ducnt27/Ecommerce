import { Router } from "express";
import authRouter from "./AuthRouter.js";
import categoryRouter from "./products/CategoryRouter.js";
import productRouter from "./products/ProductRouter.js";
const router = Router();
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/products", productRouter);
export default router;
