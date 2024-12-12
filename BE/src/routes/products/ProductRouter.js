import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductBySlug,
  pagingProducts,
  restoreProduct,
  updateProduct,
} from "../../controllers/products/ProductController.js";

const productRouter = Router();
productRouter.post(`/create`, createProduct);
productRouter.put(`/update/:id`, updateProduct);
productRouter.put(`/delete/:id`, deleteProduct);
productRouter.put(`/restore/:id`, restoreProduct);
productRouter.get(`/pagingProducts`, pagingProducts);
productRouter.get(`/findById/:id`, getProductById);
productRouter.get(`/findBySlug/:slug`, getProductBySlug);

export default productRouter;
