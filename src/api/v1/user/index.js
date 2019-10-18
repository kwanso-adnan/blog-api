// @ts-check
import { Router } from 'express';
import userController from './userController';
import authenticateUser from '../../../middleware/authentication';
import addUserId from './userMiddleware';

// Check the difference between the implementation of put and patch.
const { getMe, updateMe, replaceMe } = userController;

const router = Router();

router
  .route('/me')
  .all([authenticateUser, addUserId])
  .get(getMe)
  .put(replaceMe)
  .patch(updateMe);

export default router;
