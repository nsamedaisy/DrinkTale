import { Request, Response } from "express";
import { db } from "../utils/db.server";

import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { error } from "console";


const jwtSecret: string = process.env.JWT_SECRET ?? 'default_secret';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: 'user registered successfully', user })
    } catch (error) { console.error('error registering user:', error); res.status(500).json({ error: 'internal server error' }) }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' })
            return
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ error: 'Invalid ' })
            return
        }
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '2h' });
        res.status(200).json({ token })
    } catch (error) {
        console.error('error logging user', error);
        res.status(500).json({ error: 'Internal server error' })
    }
};

export const generateAPIKey = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.body.user;

        const apiKey = uuidv4();

        await db.aPIKey.create({
            data: {
                key: apiKey,
                userId,
            },
        })
        res.status(201).json({ apiKey })

    } catch (error) {
        console.error('error generating API key:', error)
        res.status(500).json({ error: 'internal server error' })
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {

        res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
        console.error()
    }
}