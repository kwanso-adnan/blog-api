import { ValidationError } from 'sequelize';
import auth from '../../../utils/auth';
import userService from '../services/user';
import errors from '../../../utils/errors';

const { notFound, unAuthorized, forbidden, serverError } = errors;
const { newToken } = auth;
const { create, getByEmail } = userService;

/* eslint-disable no-use-before-define */
export default {
  signup,
  signin
};

async function signup(req, resp, next) {
  const { user } = req.body;
  try {
    const newUser = await create(user);
    const token = newToken({ id: newUser.id });
    return resp.status(201).json({ token });
  } catch (error) {
    if (error instanceof ValidationError) {
      const { message } = error.errors[0];
      next(forbidden(message));
    }
    next(serverError('Something went wrong'));
  }
}

async function signin(req, resp, next) {
  const {
    user: { email, password }
  } = req.body;
  try {
    const user = await getByEmail(email);
    if (!user) {
      next(notFound('User not found.'));
    }
    const authenticated = await user.authenticate(password);
    if (!authenticated) {
      next(unAuthorized('Invalid email or password!'));
    }
    const token = newToken({ id: user.id });
    resp.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
}
