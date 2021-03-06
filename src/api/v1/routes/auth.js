import { Router } from 'express';
import authController from '../controllers/auth';

const { signin, signup } = authController;

const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
