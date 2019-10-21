// @ts-check
import auth from '../utils/auth';
import userService from '../api/v1/user/userService';

const { verifyToken } = auth;
const { getById } = userService;

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
  const user = await getById(payload.id).catch(error => {
    return resp.status(401).json({ error: { message: 'Unauthorized!' } });
  });
  // Create an error class.
  // AutoCatch
  // Line 109 goes to line 104.kwsQ9i35q1oFFQGJ
  // If using mutliple try catch in a function, then divide the function into sub-functions
  req.user = user;
  next();
}
