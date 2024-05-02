import express from "express";
import * as GlassService from "./glass.service";
import { Glass } from "@prisma/client";
import { db } from "../utils/db.server";

export const glassRouter = express.Router()

// Get all glasses
glassRouter.get('/', async (req, res) => {
    try {
        const glasses = await GlassService.getAllGlasses();
        res.json(glasses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single glass by ID
glassRouter.get('/:id', async (req, res) => {
    try {
        const glassId = parseInt(req.params.id);
        const glass = await GlassService.getGlassById(glassId);

        if (glass) {
            res.json(glass);
        } else {
            res.status(404).json({ error: 'Glass not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new glass
glassRouter.post('/', async (req, res) => {
    try {
        const glassData = req.body;
        const newGlass = await GlassService.createGlass(glassData);
        res.json(newGlass);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing glass
glassRouter.put('/:id', async (req, res) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const glassData: Omit<Glass, "id"> = req.body;
        const updatedGlass = await GlassService.updateGlass(glassData, id);

        if (updatedGlass) {
            res.json(updatedGlass);
        } else {
            res.status(404).json({ error: 'Glass not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a glass
glassRouter.delete('/:id', async (req, res) => {
    try {
        const glassId = parseInt(req.params.id);
        await GlassService.deleteGlass(glassId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

