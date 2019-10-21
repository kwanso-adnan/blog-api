import { checkPassword, hashPassword } from '../../../utils/bcrypt';
import auth from '../../../utils/auth';
import userService from '../user/userService';

const { newToken } = auth;
const { create, getByEmail } = userService;

/* eslint-disable no-use-before-define */
export default {
  signup,
  signin
};

async function signup(req, resp, next) {
  const { password } = req.body;

  try {
    const passwordHash = await hashPassword(password);
    req.body.password = passwordHash;
    const newUser = await create(req.body);
    const token = newToken({ id: newUser.id });
    return resp.status(201).json({ token });
  } catch (error) {
    next(error);
  }
}

async function signin(req, resp, next) {
  // Handle the validations on model level
  const { email, password } = req.body;

  try {
    const user = await getByEmail(email);
    const authenticated = await checkPassword(password, user.password);

    if (!authenticated) {
      // Have to use the custom error class. But how???
      return resp.status(401).json({ error: 'Unauthorized' });
    }

    const token = newToken({ id: user.id });
    return resp.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
}
