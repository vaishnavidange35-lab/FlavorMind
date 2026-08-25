import { authService } from '../services/auth.service.js';
import { asyncHandler } from '../middlewares/error.middleware.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error: { message: 'Email and password are required fields.' }
    });
  }

  const result = await authService.login(email, password);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: result
  });
});

export const register = asyncHandler(async (req, res) => {
  const { full_name, email, password, dietary_restrictions } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error: { message: 'Full name, email, and password are required.' }
    });
  }

  const result = await authService.register(full_name, email, password, dietary_restrictions);
  res.status(201).json({
    success: true,
    statusCode: 201,
    data: result
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { user }
  });
});
