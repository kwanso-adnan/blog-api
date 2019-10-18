// @ts-check
import auth from '../utils/auth';
import { User } from '../db/models';

const { verifyToken } = auth;

export default async function authenticateUser(req, resp, next) {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return resp.status(401).json({ error: 'Unauthorized!' });
  }
  const token = bearer.split(' ')[1];
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (error) {
    return resp.status(401).json({ error });
  }

  // Double level db exception?
  const user = await User.findOne({ where: { id: payload.id } }).catch(
    error => {
      throw new Error(error);
    }
  );
  // Create an error class.
  if (user instanceof Error) {
    next(user);
  }
  // AutoCatch
  // Line 109 goes to line 104.
  // If using mutliple try catch in a function, then divide the function into sub-functions
  if (!user) {
    return resp.status(401).json({ error: { message: 'Unauthorized!' } });
  }
  req.user = user;
  next();
}
