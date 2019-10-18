import { User } from '../../../db/models';

/* eslint-disable no-use-before-define */
export default {
  create,
  getById,
  update,
  replace
};

function create({ firstName = '', lastName = '', email = '', password = '' }) {
  return User.create({ firstName, lastName, email, password });
}

function getById(id) {
  return User.findByPk(id);
}

function update(id, updates) {
  const columns = ['firstName', 'lastName', 'email', 'password'];
  const updatedCols = {};
  columns.forEach(col => {
    if (updates[col]) {
      updatedCols[col] = updates[col];
    }
  });
  return User.update(updatedCols, { where: id });
}

function replace(id, user) {
  const columns = ['firstName', 'lastName', 'email', 'password'];
  const updatedUser = {};
  columns.forEach(col => {
    updatedUser[col] = user[col] || null;
  });
  return User.update(updatedUser, { where: id });
}
