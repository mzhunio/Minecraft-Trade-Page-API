import { Router } from "express";
import { UserController } from "./user.controller";


const userRouter = Router();
const userController = new UserController();

userRouter.get("/user", userController.getAllUsers.bind(userController));
userRouter.post("/user", userController.createUser.bind(userController));
userRouter.patch("/user/:id", userController.updateUser.bind(userController));
userRouter.delete("/user/:id", userController.deleteUser.bind(userController));

export { userRouter };