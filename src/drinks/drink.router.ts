import express from "express";
import { Response, Request } from "express";
import { body, validationResult } from "express-validator";

import * as DrinkService from "./drink.service";
import { Drink } from "@prisma/client";
import { db } from "../utils/db.server";

export const drinkRouter = express.Router()

//  GET: list of all Drinks 
drinkRouter.get("/", async (req: Request, res: Response) => {
    try {
        const drinks = await DrinkService.getAllDrinks()
        return res.status(200).json(drinks)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

// GET: drink a single drink
drinkRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const drink = await DrinkService.getDrink(id)
        if (drink) {
            return res.status(200).json(drink)
        }
        return res.status(404).json("drink could not be found")
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

// POST: create a drink 
drinkRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newDrink = req.body as Drink;
        const drink = await DrinkService.createDrink(newDrink);
        return res.status(201).json(drink);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// PUT: update a drink 
drinkRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const updatedDrinkData: Omit<Drink, "id"> = req.body;
        const updatedDrink = await DrinkService.updateDrink(updatedDrinkData, id);
        return res.status(200).json(updatedDrink);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// DELETE: drink 
drinkRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        await DrinkService.deleteDrink(id);
        return res.status(204).send("drink was successfully deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});
