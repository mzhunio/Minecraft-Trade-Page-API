import { Router } from "express";
import { TradeController } from "./trade.controller";

const tradeRouter = Router();
const tradeController = new TradeController();

tradeRouter.get("/trade", tradeController.getAllUsers.bind(tradeController));
tradeRouter.get("/trade/:userId", tradeController.getTradeByUser.bind(tradeController));
tradeRouter.get("/trade/:serverIpAddress", tradeController.getTradeByServerIp.bind(tradeController));
tradeRouter.post("/trade", tradeController.createTrade.bind(tradeController));
tradeRouter.delete("/trade/:id", tradeController.deleteTrade.bind(tradeController));

export { tradeRouter };