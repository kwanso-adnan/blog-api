import postService from '../services/post';
import errorChecker from '../../../utils/errorChecker';
import errors from '../../../utils/errors';

const { notFound } = errors;
const { create, update, remove, replace, getAll, getById } = postService;

/* eslint-disable no-use-before-define */
export default {
  createPost,
  deletePost,
  updatePost,
  replacePost,
  getPostById,
  getAllPosts
};

async function createPost(req, resp, next) {
  const userId = req.user.id;
  const post = { ...req.body.post, userId };
  try {
    const data = await create(post);
    resp.status(201).json(data);
  } catch (error) {
    next(errorChecker(error));
  }
}

async function deletePost(req, resp, next) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const countDeleted = await remove(id, userId);
    if (countDeleted === 0) {
      return next(notFound('Post not found.'));
    }
    resp.status(200).json({ message: `${countDeleted} record delted.` });
  } catch (error) {
    next(errorChecker(error));
  }
}

async function getPostById(req, resp, next) {
  const { id } = req.params;
  try {
    const record = await getById(id);
    if (!record) {
      return next(notFound('Post not found.'));
    }
    resp.status(200).json(record);
  } catch (error) {
    next(errorChecker(error));
  }
}

async function getAllPosts(req, resp, next) {
  try {
    const records = await getAll(req.query);
    resp.status(200).json(records);
  } catch (error) {
    return next(errorChecker(error));
  }
}

async function updatePost(req, resp, next) {
  const { post } = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const { dataValues: updatedRecord } = await update(id, userId, post);
    resp.status(201).json(updatedRecord);
  } catch (error) {
    next(errorChecker(error));
  }
}

async function replacePost(req, resp, next) {
  const { post } = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const { dataValues: replacedRecord } = await replace(id, userId, post);
    resp.status(201).json(replacedRecord);
  } catch (error) {
    next(errorChecker(error));
  }
}
