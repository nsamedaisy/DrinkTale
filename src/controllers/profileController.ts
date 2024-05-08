import { Request, Response } from 'express';
import { db } from '../utils/db.server'


interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        profile: string;
        password: string;
        isAdmin: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
}

// Get user profile
export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const userProfile = await db.user.findUnique({
            where: { id: userId },
            select: { id: true, firstName: true, lastName: true, email: true, phone: true }
        });
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        return res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user profile
export const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, phone } = req.body;
        const updatedUserProfile = await db.user.update({
            where: { id: userId },
            data: { firstName, lastName, phone }
        });
        return res.status(200).json(updatedUserProfile);
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
