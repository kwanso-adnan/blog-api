import { Router } from 'express';
import commentController from './commentController';

const router = Router();

const { createOne, deleteOne } = commentController;

router
  .route('/comments/:id')
  .post(createOne)
  .delete(deleteOne);

export default router;
