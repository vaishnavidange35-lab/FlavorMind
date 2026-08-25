import { userRepository } from '../repositories/user.repository.js';
import { asyncHandler } from '../middlewares/error.middleware.js';

export const updatePalate = asyncHandler(async (req, res) => {
  const { palateVector, dietaryRestrictions } = req.body;
  const updated = await userRepository.updatePalate(req.user.id, palateVector, dietaryRestrictions);
  
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { user: updated }
  });
});
