import { Router } from 'express';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import postRouter from './routes/post';
import commentRouter from './routes/comment';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

export default router;
