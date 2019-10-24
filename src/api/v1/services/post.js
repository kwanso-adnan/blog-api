import { Op } from 'sequelize';
import { Post, Comment } from '../../../db/models';
import { PAGINATION_LIMIT } from '../../../constants';
import CustomError from '../../../utils/CustomError';
import errors from '../../../utils/errors';

const { notFound, forbidden } = errors;

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

    // Self association in Comment and replies
    include: [
      {
        model: Comment,
        as: 'comments'
        // where: {
        //   parentId: ,

        // },
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

async function remove(id, userId) {
  return new Promise((resolve, reject) => {
    Post.findOne({ where: { id } })
      .then(post => {
        if (!post) {
          reject(new CustomError(notFound('Post with given Id not found.')));
        }
        if (post && post.userId !== userId) {
          reject(new CustomError(forbidden('Forbidden.')));
        }
        const data = post.destroy();
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

async function update(id, userId, { title = null, body = null }) {
  const updatedColumns = {};

  if (title) updatedColumns.title = title;
  if (body) updatedColumns.body = body;

  return new Promise((resolve, reject) => {
    Post.findOne({ where: { id } })
      .then(post => {
        if (!post) {
          reject(new CustomError(notFound('Post with given id not found.')));
        }
        if (post && post.userId !== userId) {
          reject(new CustomError(forbidden('Forbidden.')));
        }
        const data = post.update(updatedColumns);
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function replace(id, userId, { title = null, body = null }) {
  return new Promise((resolve, reject) => {
    Post.findOne({ where: { id } })
      .then(post => {
        if (!post) {
          reject(new CustomError(notFound('Post with given Id not found.')));
        }
        if (post && post.userId !== userId) {
          reject(new CustomError(forbidden('Forbidden')));
        }
        const data = post.update({ title, body });
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
