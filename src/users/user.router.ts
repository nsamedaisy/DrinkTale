// user endpoint 

import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as UserService from "./user.service";

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