import { Router } from "express";
import { AuthController } from "./auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/logout/:id", authController.logout.bind(authController));

export { authRouter };
