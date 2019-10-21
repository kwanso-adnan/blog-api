import { Router } from 'express';
import commentController from './commentController';
import authenticateUser from '../../../middleware/authentication';

const router = Router();

const { createOne, deleteOne } = commentController;

router
  .route('/comments/:id')
  .post([authenticateUser, createOne])
  .delete(deleteOne);

export default router;
