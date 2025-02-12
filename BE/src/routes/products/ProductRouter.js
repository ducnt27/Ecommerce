import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  getProductDetail,
  pagingProducts,
  restoreProduct,
  updateProduct,
} from "../../controllers/products/ProductController.js";

const productRouter = Router();
productRouter.post(`/create`, createProduct);
productRouter.put(`/update/:id`, updateProduct);
productRouter.put(`/delete/:id`, deleteProduct);
productRouter.put(`/restore/:id`, restoreProduct);
productRouter.get(`/getAllProducts`, getAllProducts);
productRouter.get(`/pagingProducts`, pagingProducts);
productRouter.get(`/getDetail/:slug`, getProductDetail);
productRouter.get(`/findById/:id`, getProductById);
productRouter.get(`/findBySlug/:slug`, getProductBySlug);

export default productRouter;
