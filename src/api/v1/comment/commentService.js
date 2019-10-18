import { Comment } from '../../../db/models';

/* eslint-disable no-use-before-define */
export default {
  create,
  remove
};

function create({ body, name, email, postId }) {
  return Comment.create({ body, name, email, postId });
}

function remove(id) {
  return Comment.destroy({ where: { id } });
}
