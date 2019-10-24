import { ValidationError, ConnectionError } from 'sequelize';
import errors from './errors';
import CustomError from './CustomError';

const { badRequest, serverError } = errors;

export default function errorChecker(error) {
  const { message } = error.errors[0];
  if (error instanceof CustomError) {
    return error;
  }
  if (error instanceof ValidationError) {
    return badRequest(message);
  }
  if (error instanceof ConnectionError) {
    return serverError(message);
  }
  return serverError(error.message);
}
