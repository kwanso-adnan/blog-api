// @ts-check
import auth from '../utils/auth';
import userService from '../api/v1/services/userService';
import { CustomError } from '../utils/error';

const { verifyToken } = auth;
const { getById } = userService;

export default async function authenticateUser(req, resp, next) {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    throw new CustomError(401, 'Unauthorized!');
  }

  const token = bearer.split(' ')[1];
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (error) {
    throw new CustomError(401, 'Unauthorized!');
  }

  // Double level db exception?
  const user = await getById(payload.id).catch(error => {
    return resp.status(401).json({ error: { message: 'Unauthorized!' } });
  });
  req.user = user;
  next();
}
