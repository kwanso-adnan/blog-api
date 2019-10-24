import commentService from '../services/comment';
import errors from '../../../utils/errors';
import errorChecker from '../../../utils/errorChecker';

const { create, remove } = commentService;
const { notFound } = errors;

/* eslint-disable no-use-before-define */
export default {
  createComment,
  deleteComment
};

async function createComment(req, resp, next) {
  const userId = req.user.id;
  const comment = { ...req.body.comment, userId };
  try {
    const data = await create(comment);
    resp.status(201).json(data);
  } catch (error) {
    next(errorChecker(error));
  }
}

async function deleteComment(req, resp, next) {
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
