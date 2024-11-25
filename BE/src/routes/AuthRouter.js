import { Router } from "express";
import {
  changeProfile,
  currentUser,
  loginForm,
  logout,
  refreshToken,
  registerForm,
  socialUser,
} from "../controllers/AuthController.js";
import authentication from "../middlewares/authentication.js";

const authRouter = Router();
authRouter.post("/register", registerForm);
authRouter.post("/login", loginForm);
authRouter.post("/socialUser", socialUser);
authRouter.post("/refreshToken", refreshToken);
authRouter.post("/logout", authentication, logout);

authRouter.get("/currentUser", authentication, currentUser);
authRouter.put("/changeProfile", authentication, changeProfile);
export default authRouter;
