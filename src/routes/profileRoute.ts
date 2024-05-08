
import express from 'express';

import { authenticateUser } from '../middlewares/authMiddleware';
import { getUserProfile, updateUserProfile } from '../controllers/profileController';

const router = express.Router();

router.get('/', authenticateUser, getUserProfile);
router.put('/', authenticateUser, updateUserProfile)

export default router;
