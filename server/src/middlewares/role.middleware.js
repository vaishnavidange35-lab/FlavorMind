import { ApiError } from '../utils/apiError.js';

/**
 * Middleware to restrict access to specific roles
 * @param {...string} allowedRoles 
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Unauthorized', 'UNAUTHORIZED'));
    }

    // Default to 'user' if role isn't explicitly set in token
    const userRole = req.user.role || 'user';

    if (!allowedRoles.includes(userRole)) {
      return next(new ApiError(403, 'Forbidden: Insufficient privileges', 'FORBIDDEN'));
    }

    next();
  };
};
