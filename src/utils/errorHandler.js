export default function handleError(err, res) {
  const {
    statusCode = 500,
    message = 'Something went wrong. Please try again',
    error = 'Internal Serve Error'
  } = err;

  res.status(statusCode).json({
    statusCode,
    error,
    message
  });
}
