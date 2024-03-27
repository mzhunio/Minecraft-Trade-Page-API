import { Request, Response } from "express";
import { CreateUserModel } from "../user/user.model";
import { UserService } from "../user/user.service";
import { LoginModel } from "./auth.model";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService = new AuthService();
  private userService = new UserService();

  async register(req: Request, res: Response) {
    const { username, email, password, isAdmin, lastActive, imagePath } = req.body as CreateUserModel;

    try {
      const user = await this.userService.createUser({
        username,
        email,
        password,
        isAdmin,
        lastActive,
        imagePath,
      });
      res.send(user);
    } catch (err: any) {
      const message = err.message ?? `Cannot create user`;
      res.status(400).send({ message });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body as LoginModel;

    try {
      const user = await this.authService.login({ username, password });
      await this.authService.updateLastActive(user.id);

      res.send(user);
    } catch (err: any) {
      const message = err.message ?? `Cannot authenticate user`;
      res.status(400).send({ message });
    }
  }

  async logout(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    
    await this.authService.updateLastActive(id);
    
    const user = await this.userService.getUser(id)
    res.send(user);
  }
}
