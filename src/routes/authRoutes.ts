import express from 'express';
import { register, login, logout, generateAPIKey } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/apiKey', generateAPIKey);

export default router;
