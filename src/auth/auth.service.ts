import { Pool } from "mysql2/promise";
import { pool } from "../database/connection";
import { UserModel } from "../user/user.model";
import { LoginModel } from "./auth.model";

export class AuthService {
  private pool: Pool = pool;

  login(loginModel: LoginModel): Promise<UserModel> {
    return this.findUserByUserNameAndPassword(loginModel);
  }

  async updateLastActive(userId: number) {
    const lastActive = new Date();

    await this.pool.execute(
      "UPDATE User SET lastActive = ? WHERE id = ? ",
      [lastActive.toISOString(), userId]
    );
  }

  private async findUserByUserNameAndPassword({
    username,
    password,
  }: LoginModel): Promise<UserModel> {
    const [users] = await this.pool.query<UserModel[]>(
      "Select * FROM User WHERE username = ? AND password = ?",
      [username, password]
    );
    const [user] = users;

    if (!user) {
      throw new Error("Could not authenticate user");
    }

    return user;
  }
}
