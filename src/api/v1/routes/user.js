// @ts-check
import { Router } from 'express';
import authenticateUser from '../../../middleware/authentication';
import addUserId from '../middleware/userMiddleware';
import userController from '../controllers/user';

const { getMe, updateMe, replaceMe } = userController;

const router = Router();

router
  .route('/me')
  .all([authenticateUser, addUserId])
  .get(getMe)
  .put(replaceMe)
  .patch(updateMe);

export default router;
