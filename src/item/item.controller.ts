import { Request, Response } from "express";
import { CreateItemModel} from "./item.model";
import { ItemService } from "./item.service";

export class ItemController {
    private itemService = new ItemService();

    async getAllItems(req: Request, res: Response) {
      try {
        const items = await this.itemService.getItems();
        res.send(items);
      } catch (err: any) {
        const message = err.message ?? `Cannot fetch all items`;
        res.status(400).send({ message });
      }
    }

    async getItem(req: Request, res: Response) {
        const { id } = req.params;
    
        try {
          const item = await this.itemService.getItem(parseInt(id, 10));
          res.send(item);
        } catch (err: any) {
          const message = err.message ?? `Cannot get item with id ${id}`;
          res.status(400).send({ message });
        }
      }

      async getItemsByCategory(req: Request, res: Response) {
        const { category } = req.params;
    
        try {
          const items = await this.itemService.getItemsByCategory(category);
          res.send(items);
        } catch (err: any) {
          const message = err.message ?? `Cannot get items by category${category}`;
          res.status(400).send({ message });
        }
      }

      async createItem(req: Request, res: Response) {
        const {  category,
          name,
          image,
          userId } = req.body as CreateItemModel;
    
        try {
          const item = await this.itemService.createItem({
            category,
            name,
            image,
            userId
          });
          res.send(item);
        } catch (err: any) {
          const message = err.message ?? `Cannot create Item`;
          res.status(400).send({ message });
        }
      }

      async deleteItem(req: Request, res: Response) {
        const { id } = req.params;
        await this.itemService.getItem(parseInt(id, 10));
    
        try {
          const item = await this.itemService.deleteItem(parseInt(id, 10));
          res.send(item);
        } catch (err: any) {
          const message = err.message ?? `Cannot delete item with id ${id}`;
    
          res.status(400).send({ message });
        }
      }
}