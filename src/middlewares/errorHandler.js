function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  console.error(`[ERROR] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    error: {
      statusCode,
      message
    }
  });
}

module.exports = { errorHandler };