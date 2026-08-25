import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Access denied. Authentication token missing.'
      }
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired authentication token.'
      }
    });
  }
}
