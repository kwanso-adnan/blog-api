import { Op } from 'sequelize';
import { Post, Comment } from '../../../db/models';
import { PAGINATION_LIMIT } from '../../../constants';
/* eslint-disable no-use-before-define */
export default {
  create,
  getAll,
  getById,
  replace,
  update,
  remove
};

function create({ title = '', body = '', userId = null }) {
  return Post.create({ title, body, userId });
}

function getAll({ filter = '', page = 1, userId = null, order = 'ASC' }) {
  const limit = PAGINATION_LIMIT;
  const offset = limit * (Number(page) - 1);

  const options = {
    where: {
      title: {
        [Op.iLike]: `%${filter}%`
      }
    },
    include: [
      {
        model: Comment
      }
    ],
    orderBy: ['title', order],
    limit,
    offset
  };
  if (userId) {
    options.where.userId = userId;
  }
  return Post.findAll(options);
}

function getById(id) {
  return Post.findByPk(id);
}

function remove(id) {
  return Post.destroy({ where: { id } });
}

function update(id, { title = null, body = null }) {
  const updatedColumns = {};
  if (title) updatedColumns.title = title;
  if (body) updatedColumns.body = body;
  return Post.update(updatedColumns, { where: { id } });
}

function replace(id, { title = null, body = null }) {
  return Post.update({ title, body }, { where: { id } });
}
