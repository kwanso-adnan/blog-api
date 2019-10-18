import bcrypt from 'bcrypt';

export function checkPassword(password, passwordHash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, (error, hash) => {
      if (error) return reject(error);
      resolve(hash);
    });
  });
}
