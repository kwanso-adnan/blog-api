// @ts-check
import auth from '../utils/auth';
import userService from '../api/v1/services/user';
import errors from '../utils/errors';

const { unAuthorized } = errors;
const { verifyToken } = auth;
const { getById } = userService;

export default async function authenticateUser(req, resp, next) {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    next(unAuthorized('Invalid token.'));
  }

  const token = bearer.split(' ')[1];
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (error) {
    next(unAuthorized(error.message));
  }

  const user = await getById(payload.id).catch(error => {
    next(error);
  });
  req.user = user;
  next();
}
