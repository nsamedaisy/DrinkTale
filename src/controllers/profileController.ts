import { Request, Response } from "express";
import { db } from "../utils/db.server";

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const userProfile = db.user.findUnique({
            where: { id: userId },
            select: { id: true, firstName: true, lastName: true, email: true, phone: true }
        });
        if (!userProfile) {
            res.status(404).json({ message: 'user profile not found' })
        }
        res.status(200).json(userProfile)
    } catch (error) {
        console.error('error fetching user profile', error)
        res.status(500).json({ message: 'internal server error' })
    }
}

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const { firstName, lastName, phone } = req.body
        const updatedUserProfile = await db.user.update({
            where: {
                id: userId
            },
            data: {
                firstName, lastName, phone
            }
        });
        return res.status(200).json(updatedUserProfile)
    } catch (error) {
        console.error('error updating userProfile', error)
        res.status(500).json({ message: 'internal server error' })
    }
}