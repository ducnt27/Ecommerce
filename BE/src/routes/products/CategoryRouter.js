import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  restoreCategory,
  updateCategory,
} from "../../controllers/products/CategoryController.js";

const categoryRouter = Router();

categoryRouter.get(`/getAll`, getAllCategories);
categoryRouter.get(`/getCategoryById/:id`, getCategoryById);
categoryRouter.get(`/getCategoryBySlug/:slug`, getCategoryBySlug);
categoryRouter.post(`/createCategory`, createCategory);
categoryRouter.put(`/update/:id`, updateCategory);
categoryRouter.put(`/delete/:id`, deleteCategory);
categoryRouter.put(`/restore/:id`, restoreCategory);

export default categoryRouter;
