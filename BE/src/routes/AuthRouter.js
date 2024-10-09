import { Router } from "express";
import { loginForm, logout, refreshToken, registerForm } from "../controllers/AuthController.js";

const authRouter = Router();
authRouter.post("/register", registerForm);
authRouter.post("/login", loginForm);
authRouter.post("/refreshToken", refreshToken);
authRouter.post("/logout", logout);
export default authRouter;

