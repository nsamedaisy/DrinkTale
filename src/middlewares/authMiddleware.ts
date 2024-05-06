import { Response, Request, NextFunction } from "express";

import Jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET ?? 'default_secret';

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer', '');
    if (!token) {
        res.status(401).json({ error: 'Unauthorized: Missing token' })
        return
    }
    try {
        const decoded = Jwt.verify(token, jwtSecret)
        req.body.userId = (decoded as { userId: number }).userId;
        next()
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }
}