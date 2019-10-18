import jwt from 'jsonwebtoken';
import { User } from '../db/models';
import { checkPassword, hashPassword } from './bcrypt';

/* eslint-disable no-use-before-define */
export default {
  newToken,
  verifyToken,
  signin,
  signup
};

const SECRET = process.env.JWT_SECRET || 'secretKey';

function newToken(payload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: 1200
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

async function signup(req, resp, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return resp.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      // 403 means forbidden, tied to application logic.
      return resp.status(403).json({ error: 'Email already in use.' });
    }
    const passwordHash = await hashPassword(password);
    // Santize Req.body bfore creating the user
    const newUser = await User.create({ ...req.body, password: passwordHash });
    const token = newToken({ id: newUser.id });
    return resp.status(201).json({ token });
  } catch (error) {
    next(error);
  }
}

async function signin(req, resp, next) {
  const { email, password } = req.body;
  // Handle the validations on model level
  if (!email || !password) {
    return resp.status(400).json({
      error: 'Bad request. Email and password are required to login.'
    });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return resp.status(401).json({
        error: 'Email or password is invalid.'
      });
    }
    const match = await checkPassword(password, user.password);
    if (!match) {
      return resp.status(401).json({ error: 'Email or password is invalid.' });
    }

    const token = newToken({ id: user.id });
    return resp.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
}
