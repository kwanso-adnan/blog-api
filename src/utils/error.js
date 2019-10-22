export class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function handleError(err, res) {
  // get all the errors here, check the type or return custom
  // error where it happens?
  // 4, 5 error classes

  let { statusCode } = err;
  if (!statusCode) {
    statusCode = 500;
  }
  res.status(statusCode).json({
    status: 'Error',
    statusCode,
    message: err.message
  });
}
