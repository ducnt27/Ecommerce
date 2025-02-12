import { Router } from "express";
import {
  createColor,
  getAllColors,
  getColorById,
  pagingColor,
  removeColorById,
  restoreColorById,
  updateColor,
} from "../../controllers/products/ColorController.js";

const colorRouter = Router();

colorRouter.post("/create", createColor);
colorRouter.get("/paginate", pagingColor);
colorRouter.get("/getAll", getAllColors);
colorRouter.get("/findById/:id", getColorById);
colorRouter.put("/update/:id", updateColor);
colorRouter.put("/delete/:id", removeColorById);
colorRouter.put("/restore/:id", restoreColorById);

export default colorRouter;
