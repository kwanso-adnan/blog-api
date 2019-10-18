import { Router } from 'express';
import auth from '../../../utils/auth';

const { signin, signup } = auth;

const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
