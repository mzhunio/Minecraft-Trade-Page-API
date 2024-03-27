import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { CreateCategoryModel, UpdateCategoryModel } from "./category.model";

export class CategoryController {
  private categoryService = new CategoryService();

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getCategories();
      res.send(categories);
    } catch (err: any) {
      const message = err.message ?? `Cannot fetch all categories`;
      res.status(400).send({ message });
    }
  }

  async getCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await this.categoryService.getCategory(parseInt(id, 10));
      res.send(category);
    } catch (err: any) {
      const message = err.message ?? `Cannot get category with id ${id}`;
      res.status(400).send({ message });
    }
  }

  async createCategory(req: Request, res: Response) {
    const { name, imagePath } = req.body as CreateCategoryModel;

    try {
      const category = await this.categoryService.createCategory({ name, imagePath });
      res.send(category);
    } catch (err: any) {
      const message = err.message ?? `Cannot create category`;
      res.status(400).send({ message });
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const changes = req.body as UpdateCategoryModel;

    try {
      const category = await this.categoryService.updateCategory(parseInt(id, 10), changes);
      res.send(category);
    } catch (err: any) {
      const message = err.message ?? `Cannot update user with id ${id}`;

      res.status(400).send({ message });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await this.categoryService.deleteCategory(parseInt(id, 10));
      res.send(category);
    } catch (err: any) {
      const message = err.message ?? `Cannot delete category with id ${id}`;

      res.status(400).send({ message });
    }
  }
}
