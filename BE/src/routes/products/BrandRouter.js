import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getAll,
  getAllBrands,
  getBrandById,
  getBrandBySlug,
  restoreBrand,
  updateBrand,
} from "../../controllers/products/BrandController.js";

const brandRouter = Router();
brandRouter.get(`/get`, getAll);
brandRouter.get(`/paging`, getAllBrands);
brandRouter.get(`/get/:id`, getBrandById);
brandRouter.get(`/get/:slug`, getBrandBySlug);
brandRouter.post(`/create`, createBrand);
brandRouter.put(`/update/:id`, updateBrand);
brandRouter.put(`/delete/:id`, deleteBrand);
brandRouter.put(`/restore/:id`, restoreBrand);
export default brandRouter;
