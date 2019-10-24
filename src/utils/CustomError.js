export default class CustomError extends Error {
  constructor({ statusCode, error, message }) {
    super();
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
  }
}
