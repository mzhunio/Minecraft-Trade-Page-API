import { Request, Response } from "express";
import { CreateTradeModel } from "./trade.model";
import { TradeService } from "./trade.service";

export class TradeController {
  private tradeService = new TradeService();

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.tradeService.getTrades();
      res.send(users);
    } catch (err: any) {
      const message = err.message ?? `Cannot fetch all users trades`;
      res.status(400).send({ message });
    }
  }

  async getTradeByUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const users = await this.tradeService.getTradeByUser(parseInt(userId, 10));
      res.send(users);
    } catch (err: any) {
      const message = err.message ?? `Cannot fetch all user trades`;
      res.status(400).send({ message });
    }
  }

  async getTradeByServerIp(req: Request, res: Response) {
    const { serverIpAddress } = req.body;

    try {
      const trades = await this.tradeService.getTradeByServerIp(serverIpAddress);
      res.send(trades);
    } catch (err: any) {
      const message = err.message ?? `Cannot fetch all server trades`;
      res.status(400).send({ message });
    }
  }

  async createTrade(req: Request, res: Response) {
    const { userId, categoryItemId, description, serverIpAddress, quantity } =
      req.body as CreateTradeModel;

    try {
      const trade = await this.tradeService.createTrade({
        userId,
        categoryItemId,
        description,
        serverIpAddress,
        quantity
      });
      res.send(trade);
    } catch (err: any) {
      const message = err.message ?? `Cannot create trade`;
      res.status(400).send({ message });
    }
  }

  async deleteTrade(req: Request, res: Response) {
    const { id } = req.params;
    await this.tradeService.getTrade(parseInt(id, 10));

    try {
      const user = await this.tradeService.deleteTrade(parseInt(id, 10));
      res.send(user);
    } catch (err: any) {
      const message = err.message ?? `Cannot delete user trade with id ${id}`;

      res.status(400).send({ message });
    }
  }
}
