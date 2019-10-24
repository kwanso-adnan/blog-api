// @ts-check
import { Router } from 'express';
import postController from '../controllers/post';
import authenticateUser from '../../../middleware/authentication';
import addUserId from '../../../middleware/addUserId';

const {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getAllPosts,
  replacePost
} = postController;

const router = Router();

router
  .route('/')
  .get(getAllPosts)
  .post([authenticateUser, addUserId, createPost]);

router
  .route('/:id')
  .get(getPostById)
  .patch([authenticateUser, addUserId, updatePost])
  .put([authenticateUser, addUserId, replacePost])
  .delete([authenticateUser, deletePost]);
export default router;
