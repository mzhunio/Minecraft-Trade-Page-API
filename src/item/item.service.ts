import { OkPacket, Pool } from "mysql2/promise";
import { pool } from "../database/connection";
import { CreateItemModel, ItemModel } from "./item.model";

export class ItemService {
  private pool: Pool = pool;

  async getItems(): Promise<ItemModel[]> {
    const [items] = await this.pool.query<ItemModel[]>("Select * FROM Items;");
    return items;
  }

  async getItem(id: number): Promise<ItemModel | null> {
    const [rows] = await this.pool.query<ItemModel[]>(
      "SELECT * FROM Items WHERE id = ?",
      [id]
    );

    const row = {
      ...rows[0],
      image: rows[0].image.split("/revision")[0],
    };

    return row;
  }

  async getItemsByCategory(category: string): Promise<ItemModel[]> {
    const [items] = await this.pool.query<ItemModel[]>(
      "SELECT * FROM `Items` WHERE category = ?",
      [category]
    );
    return items;
  }

  async createItem({
    name,
    category,
    image,
    userId,
  }: CreateItemModel): Promise<ItemModel | null> {
    const [result] = await this.pool.execute<OkPacket>(
      `INSERT INTO Items (name, category, image, userId) VALUES (?, ?, ?, ?);`,
      [name, category, image, userId]
    );

    const [rows] = await this.pool.query<ItemModel[]>(
      `SELECT * FROM Items WHERE id = ?`,
      [result.insertId]
    );

    return rows[0];
  }

  async deleteItem(id: number): Promise<ItemModel | null> {
    const item = await this.getItem(id);
    await this.pool.execute("DELETE FROM Items WHERE id = ?", [id]);
    return item;
  }
}
