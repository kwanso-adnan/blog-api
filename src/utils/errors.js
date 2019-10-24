export default {
  badRequest,
  unAuthorized,
  serverError,
  notFound,
  forbidden
};

function badRequest(message) {
  return {
    statusCode: 400,
    error: 'Bad Request',
    message: message || 'Bad request.'
  };
}

function unAuthorized(message) {
  return {
    statusCode: 401,
    error: 'Unauthorized.',
    message
  };
}

function serverError(message) {
  return {
    statusCode: 500,
    error: 'Internal server error.',
    message
  };
}

function notFound(message) {
  return {
    statusCode: 404,
    error: 'Not found.',
    message
  };
}

function forbidden(message) {
  return {
    statusCode: 403,
    error: 'Forbidden.',
    message
  };
}
