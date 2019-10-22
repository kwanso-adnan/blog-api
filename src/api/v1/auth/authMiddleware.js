import { CustomError } from '../../../utils/error';

export default function isPasswordValid(req, resp, next) {
  const { password } = req.body;

  const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/.test(
    password
  );

  if (!valid) {
    const error = new CustomError(
      400,
      'Password must contain between 8 to 30 characters, with alteast one uppercase, one lowercase and one digit.'
    );
    next(error);
  }
  next();
}
