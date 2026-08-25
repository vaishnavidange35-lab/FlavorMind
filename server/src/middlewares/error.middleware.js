export function errorHandler(err, req, res, next) {
  console.error('[Error Middleware]:', err);

  const statusCode = err.statusCode || res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred on the server.',
      details: err.details || null
    },
    meta: {
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    }
  });
}

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
