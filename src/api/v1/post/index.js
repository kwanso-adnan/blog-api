// @ts-check
import { Router } from 'express';
import postController from './postController';
import authenticateUser from '../../../middleware/authentication';
import addUserId from '../../../middleware/addUserId';

const {
  getOne,
  getAll,
  updateOne,
  replaceOne,
  createOne,
  deleteOne
} = postController;

const router = Router();

router
  .route('/')
  .get(getAll)
  .post([authenticateUser, addUserId, createOne]);

router
  .route('/:id')
  .get(getOne)
  .patch([authenticateUser, addUserId, updateOne])
  .put([authenticateUser, addUserId, replaceOne])
  .delete([authenticateUser, deleteOne]);
export default router;
