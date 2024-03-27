import { Router } from "express";
import { CategoryController } from "./category.controller";


const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get("/category", categoryController.getAllCategories.bind(categoryController));
categoryRouter.post("/category", categoryController.createCategory.bind(categoryController));
categoryRouter.patch("/category/:id", categoryController.updateCategory.bind(categoryController));
categoryRouter.delete("/category/:id", categoryController.deleteCategory.bind(categoryController));

export { categoryRouter };