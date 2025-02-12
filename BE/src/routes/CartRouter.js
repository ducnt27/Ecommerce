import { Router } from "express";
import {
  addToCart,
  pagingCart,
  updateCartItem,
} from "../controllers/CartController.js";
import authentication from "../middlewares/authentication.js";

const cartRouter = Router();
cartRouter.post("/addToCart", authentication, addToCart);
cartRouter.put("/updateCart", authentication, updateCartItem);
cartRouter.get("/pagingCart", authentication, pagingCart);
export default cartRouter;
