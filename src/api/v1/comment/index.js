import { Router } from 'express';
import commentController from './commentController';
import authenticateUser from '../../../middleware/authentication';
import addUserId from '../../../middleware/addUserId';

const router = Router();

const { createOne, deleteOne } = commentController;

router.post('/', [authenticateUser, addUserId, createOne]);
router.delete('/:id', [authenticateUser, deleteOne]);

export default router;
