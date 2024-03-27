import { Router } from "express";
import { ItemController } from "./item.controller";

const itemRouter = Router();
const itemController = new ItemController();

itemRouter.get("/item", itemController.getAllItems.bind(itemController));
itemRouter.get("/item/:category", itemController.getItemsByCategory.bind(itemController));
itemRouter.post("/item", itemController.createItem.bind(itemController));
itemRouter.delete("/item/:id", itemController.deleteItem.bind(itemController));

export { itemRouter };