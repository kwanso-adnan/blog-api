import { Router } from 'express';
import commentController from './commentController';
import authenticateUser from '../../../middleware/authentication';
import addUserId from '../../../middleware/addUserId';

const router = Router();

const { createOne, deleteOne } = commentController;

// If too many comments, pagination needs to be implemented, in this case,
// We need a separate route for comments of a single post.
// Read about RESTFul routes.
// User posts should be nested route
router.post('/', [authenticateUser, addUserId, createOne]);
router.delete('/:id', [authenticateUser, deleteOne]);

export default router;
