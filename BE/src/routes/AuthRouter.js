import { Router } from "express";
import {
  currentUser,
  loginForm,
  logout,
  refreshToken,
  registerForm,
} from "../controllers/AuthController.js";
import authentication from "../middlewares/authentication.js";

const authRouter = Router();
authRouter.post("/register", registerForm);
authRouter.post("/login", loginForm);
authRouter.post("/refreshToken", refreshToken);
authRouter.get("/currentUser", authentication, currentUser);
authRouter.post("/logout", authentication, logout);
export default authRouter;
