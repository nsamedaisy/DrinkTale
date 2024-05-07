
import express from 'express';

import { authenticateUser } from '../middlewares/authMiddleware';
import { getUserProfile, updateUserProfile } from '../controllers/profileController';

const router = express.Router();

router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile)

export default router;
