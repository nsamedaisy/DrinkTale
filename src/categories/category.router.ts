import express from "express";
import { Response, Request } from "express";
import * as CategoryService from "./category.service";

export const categoryRouter = express.Router();

// GET: List all categories
categoryRouter.get("/", async (req: Request, res: Response) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Create a new category
categoryRouter.post("/", async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
        const newCategory = await CategoryService.createCategory(name, description);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update an existing category
categoryRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedCategory = await CategoryService.updateCategory(Number(id), name, description);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Delete a category
categoryRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await CategoryService.deleteCategory(Number(id));
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
