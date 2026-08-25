import { ApiError } from '../utils/apiError.js';

export const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const parsedData = schema.parse(req[source]);
      // Replace req[source] with parsed and stripped data from Zod
      req[source] = parsedData;
      next();
    } catch (err) {
      const formattedErrors = err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message
      }));
      next(new ApiError(400, 'Validation Error', 'VALIDATION_FAILED', formattedErrors));
    }
  };
};
