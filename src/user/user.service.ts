import { OkPacket, Pool } from "mysql2/promise";
import { pool } from "../database/connection";
import { CreateUserModel, UpdateUserModel, UserModel } from "./user.model";

export class UserService {
    private pool: Pool = pool;

    async getUsers(): Promise<UserModel[]> {
        const [users] = await this.pool.query<UserModel[]>("Select * FROM User;");

        return users;
    }

    async getUser(id: number): Promise<UserModel | null> {
      const [rows] = await this.pool.query<UserModel[]>(
        "SELECT * FROM User WHERE id = ?",
        [id]
      );
  
      return rows[0];
    }

    async createUser({
        username,
        email,
        password,
        isAdmin,
        lastActive,
        imagePath,
      }: CreateUserModel): Promise<UserModel | null> {
        const [result] = await this.pool.execute<OkPacket>(
          `INSERT INTO User (username, email, password, isAdmin, lastActive, imagePath) VALUES (?, ?, ?, ?, ?, ?);`,
          [username, email, password, isAdmin, lastActive, imagePath = "https://bulma.io/images/placeholders/128x128.png"]
        );
    
        const [rows] = await this.pool.query<UserModel[]>(
          `SELECT * FROM User WHERE id = ?`,
          [result.insertId]
        );
    
        return rows[0];
    }

    async updateUser(
      id: number,
      changes: UpdateUserModel
    ): Promise<UserModel | null> {
      const user = await this.getUser(id);
  
      const { password, isAdmin } = { ...user, ...changes };
  
      await this.pool.execute(
        "UPDATE User SET password = ?, isAdmin = ? WHERE id = ?;",
        [password, isAdmin, id]
      );
  
      return this.getUser(id);
    }

    async deleteUser(id: number): Promise<UserModel | null> {
      const user = await this.getUser(id);
      await this.pool.execute("DELETE FROM User WHERE id = ?", [id]);
      return user;
    }
    
}