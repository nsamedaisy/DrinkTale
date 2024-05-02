import express from "express";
import { Response, Request } from "express";
import * as IngredientService from "./ingredient.service";

export const ingredientRouter = express.Router();

// GET: List all ingredients
ingredientRouter.get("/", async (req: Request, res: Response) => {
    try {
        const ingredients = await IngredientService.getAllIngredients();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Create a new ingredient
ingredientRouter.post("/", async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const newIngredient = await IngredientService.createIngredient(name);
        res.status(201).json(newIngredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update an existing ingredient
ingredientRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedIngredient = await IngredientService.updateIngredient(Number(id), name);
        res.status(200).json(updatedIngredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Delete an ingredient
ingredientRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await IngredientService.deleteIngredient(Number(id));
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
