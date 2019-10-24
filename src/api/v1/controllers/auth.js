import { checkPassword, hashPassword } from '../../../utils/bcrypt';
import auth from '../../../utils/auth';
import userService from '../services/userService';
import { CustomError } from '../../../utils/error';

const { newToken } = auth;
const { create, getByEmail } = userService;

/* eslint-disable no-use-before-define */
export default {
  signup,
  signin
};

// Sequelize hooks, move validations to sequelize hooks
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
  const { email, password } = req.body;
  try {
    const user = await getByEmail(email);
    if (!user) {
      throw new CustomError(404, 'User not found!');
    }
    const authenticated = await checkPassword(password, user.password);
    if (!authenticated) {
      throw new CustomError(401, 'Unauthorized');
    }
    const token = newToken({ id: user.id });
    return resp.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
}
