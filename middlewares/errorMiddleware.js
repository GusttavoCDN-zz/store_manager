function errorMiddleware(error, _req, res, _next) {
  const { body: message, statusCode } = error;
  res.status(statusCode).json(message);
}

module.exports = errorMiddleware;
