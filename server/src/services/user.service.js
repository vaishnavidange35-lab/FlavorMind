import { userRepository } from '../repositories/user.repository.js';
import { ApiError } from '../utils/apiError.js';

class UserService {
  async getUserProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User profile not found.', 'USER_NOT_FOUND');
    }
    const { password_hash, ...safeUser } = user;
    return safeUser;
  }

  async updatePalatePreferences(userId, palateVector, dietaryRestrictions) {
    // Basic validation
    if (palateVector && !Array.isArray(palateVector)) {
       throw new ApiError(400, 'Palate vector must be an array.', 'INVALID_INPUT');
    }

    const updatedUser = await userRepository.updatePalate(userId, palateVector, dietaryRestrictions);
    if (!updatedUser) {
      throw new ApiError(404, 'User profile not found.', 'USER_NOT_FOUND');
    }
    
    const { password_hash, ...safeUser } = updatedUser;
    return safeUser;
  }
}

export const userService = new UserService();
