import { OkPacket, Pool } from "mysql2/promise";
import { pool } from "../database/connection";
import {
  CreateCategoryModel,
  UpdateCategoryModel,
  CategoryModel,
} from "./category.model";

export class CategoryService {
  private pool: Pool = pool;

  async getCategories(): Promise<CategoryModel[]> {
    const [categories] = await this.pool.query<CategoryModel[]>(
      "SELECT * FROM Category;"
    );

    return categories;
  }

  async getCategory(id: number): Promise<CategoryModel | null> {
    const [rows] = await this.pool.query<CategoryModel[]>(
      "SELECT * FROM Category WHERE id = ?",
      [id]
    );

    return rows[0];
  }

  async createCategory({
    name,
    imagePath,
  }: CreateCategoryModel): Promise<CategoryModel | null> {
    const [result] = await this.pool.execute<OkPacket>(
      `INSERT INTO Category(name, imagePath) VALUES (?, ?);`,
      [name, imagePath]
    );

    const [rows] = await this.pool.query<CategoryModel[]>(
      `SELECT * FROM Category WHERE id = ?`,
      [result.insertId]
    );

    return rows[0];
  }

  async updateCategory(
    id: number,
    changes: UpdateCategoryModel
  ): Promise<CategoryModel | null> {
    const category = await this.getCategory(id);

    const { name, imagePath } = { ...category, ...changes };

    await this.pool.execute(
      "UPDATE Category SET name = ?, imagePath = ? WHERE id = ?;",
      [name, imagePath, id]
    );

    return this.getCategory(id);
  }

  async deleteCategory(id: number): Promise<CategoryModel | null> {
    const category = await this.getCategory(id);
    await this.pool.execute("DELETE FROM Category WHERE id = ?", [id]);
    return category;
  }
}
