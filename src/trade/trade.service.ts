import { OkPacket, Pool } from "mysql2/promise";
import { pool } from "../database/connection";
import { ItemService } from "../item/item.service";
import { UserService } from "../user/user.service";
import { CreateTradeModel, TradeModel } from "./trade.model";

export class TradeService {
  private pool: Pool = pool;
  private userService = new UserService();
  private categoryItemService = new ItemService();

  async getTrades(): Promise<TradeModel[]> {
    const [trades] = await this.pool.query<TradeModel[]>(
      "Select * FROM Trade;"
    );

    for (const trade of trades) {
      trade.user = await this.userService.getUser(trade.userId);
      trade.categoryItem = await this.categoryItemService.getItem(
        trade.categoryItemId
      );
    }

    return trades;
  }

  async getTrade(id: number): Promise<TradeModel | null> {
    const [rows] = await this.pool.query<TradeModel[]>(
      "SELECT * FROM Trade WHERE id = ?",
      [id]
    );

    return rows[0];
  }

   async getTradeByUser(userId: number): Promise<TradeModel[]> {
    const [trades] = await this.pool.query<TradeModel[]>(
      "SELECT * FROM Trade WHERE userId = ?;",
      [userId]
    );

    for (const trade of trades) {
      trade.user = await this.userService.getUser(trade.userId);
      trade.categoryItem = await this.categoryItemService.getItem(
        trade.categoryItemId
      );
    }
    return trades;
  }

  /*async getServerIpAddress(serverIpAddress: string): Promise<TradeModel> {
    const [rows] = await this.pool.query<TradeModel[]>(
      "SELECT * FROM Trade WHERE serverIpAddress = ?",
      [serverIpAddress]
    );
    return rows[0]
  }*/

  async getTradeByServerIp(serverIpAddress: string): Promise<TradeModel[]> {
    const [trades] = await this.pool.query<TradeModel[]>(
      "SELECT * FROM Trade WHERE serverIpAddress = ?",
      [serverIpAddress]
    );

    for (const trade of trades) {
      trade.user = await this.userService.getUser(trade.userId);
      trade.categoryItem = await this.categoryItemService.getItem(
        trade.categoryItemId);
    }
    return trades;
  }

  async createTrade({
    userId,
    categoryItemId,
    description,
    serverIpAddress,
    quantity,
  }: CreateTradeModel): Promise<TradeModel | null> {
    const [result] = await this.pool.execute<OkPacket>(
      `INSERT INTO Trade (userId, categoryItemId, description, createdDate, serverIpAddress, quantity) VALUES (?, ?, ?, ?, ?, ?);`,
      [userId, categoryItemId, description, new Date().toISOString(), serverIpAddress = "placeholderip.net", quantity]
    );

    const [rows] = await this.pool.query<TradeModel[]>(
      `SELECT * FROM Trade WHERE id = ?`,
      [result.insertId]
    );

    return rows[0];
  }

  async deleteTrade(id: number): Promise<TradeModel | null> {
    const trade = await this.getTrade(id);
    await this.pool.execute("DELETE FROM Trade WHERE id = ?", [id]);
    return trade;
  }
}
