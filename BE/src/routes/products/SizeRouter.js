import { Router } from "express";
import {
  createSize,
  getAllSizes,
  getSizeById,
  pagingSize,
  removeSizeById,
  restoreSize,
  updateSize,
} from "../../controllers/products/SizeController.js";

const sizeRouter = Router();

sizeRouter.post("/create", createSize);
sizeRouter.get("/paginate", pagingSize);
sizeRouter.get("/getAll", getAllSizes);
sizeRouter.get("/findById/:id", getSizeById);
sizeRouter.put("/update/:id", updateSize);
sizeRouter.put("/delete/:id", removeSizeById);
sizeRouter.put("/restore/:id", restoreSize);

export default sizeRouter;
