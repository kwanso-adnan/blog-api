import jwt from 'jsonwebtoken';

/* eslint-disable no-use-before-define */
export default {
  newToken,
  verifyToken
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
