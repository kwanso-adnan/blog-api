import createController from '../../../utils/controller';
import userService from './userService';

const userController = createController(userService);
const { getOne, updateOne, replaceOne } = userController;

/* eslint-disable no-use-before-define */
export default {
  getMe,
  updateMe,
  replaceMe
};

function getMe(req, resp, next) {
  getOne(req, resp, next);
}

function updateMe(req, resp, next) {
  updateOne(req, resp, next);
}

function replaceMe(req, resp, next) {
  req.params.id = req.user.id;
  replaceOne(req, resp, next);
}
