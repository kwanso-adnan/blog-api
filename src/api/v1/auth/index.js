import { Router } from 'express';
import authController from './authController';
import isPasswordValid from './authMiddleware';

const { signin, signup } = authController;

const router = Router();

router.post('/signin', signin);
router.post('/signup', [isPasswordValid, signup]);

export default router;
