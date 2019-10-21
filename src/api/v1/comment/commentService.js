import { Comment } from '../../../db/models';

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
          return reject(new Error('Record not found'));
        }
        if (comment && comment.userId !== userId) {
          return reject(new Error('Forbidden'));
        }
        const data = comment.destroy();
        resolve(data);
      })
      .catch(error => {
        return reject(error);
      });
  });
}
