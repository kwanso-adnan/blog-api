import { Comment } from '../../../db/models';
import { CustomError } from '../../../utils/error';

/* eslint-disable no-use-before-define */
export default {
  create,
  remove
};

function create({ body, userId, postId }) {
  return Comment.create({ body, userId, postId });
}

function remove(id, userId) {
  return new Promise((resolve, reject) => {
    Comment.findOne({ where: { id } })
      .then(comment => {
        if (!comment) {
          return reject(new CustomError(404, 'Record not found.'));
        }
        if (comment && comment.userId !== userId) {
          return reject(new CustomError(403, 'Forbidden!'));
        }
        const data = comment.destroy();
        resolve(data);
      })
      .catch(error => {
        reject(new CustomError(500, error.message));
      });
  });
}
