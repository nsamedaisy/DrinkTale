// user endpoint 

import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UserService from "./user.service";
import { User } from "@prisma/client";
import { db } from "../utils/db.server";

export const userRouter = express.Router();

// GET: list of all users 
userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers()
        return res.status(200).json(users)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

// GET: A single User 
userRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const user = await UserService.getUser(id);
        if (user) {
            return res.status(200).json(user)
        }
        return res.status(404).json("User could not be found")
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// POST: create a user 
userRouter.post("/", [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newUser = await UserService.createUser(req.body);
        return res.status(201).json(newUser);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// PUT: update a user 
userRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        // Omit the 'id' field from req.body
        const updatedUserData: Omit<User, "id"> = req.body;

        const updatedUser = await db.user.update({
            where: { id },
            data: updatedUserData,
        });

        if (updatedUser) {
            return res.status(200).json(updatedUser);
        }
        return res.status(404).json("User could not be found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// DELETE: user 
userRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        await UserService.deleteUser(id);
        return res.status(200).json("User deleted successfully");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});
