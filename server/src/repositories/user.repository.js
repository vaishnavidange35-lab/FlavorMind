const mockUsersDB = [
  {
    id: 'usr-1',
    email: 'chef@flavormind.ai',
    password_hash: '$2a$10$wN3M7/88g5W2eL1oVdK1y.hS8bFj2Z3xY4W5V6U7T8S9R0P1Q2', // password: "password123"
    full_name: 'Master Chef Alex',
    palate_vector: new Array(64).fill(0.1),
    dietary_restrictions: ['gluten-free'],
    created_at: new Date().toISOString()
  }
];

class UserRepository {
  async findByEmail(email) {
    return mockUsersDB.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findById(id) {
    return mockUsersDB.find(u => u.id === id) || null;
  }

  async create(userData) {
    const newUser = {
      id: `usr-${Date.now()}`,
      ...userData,
      palate_vector: new Array(64).fill(0.1),
      dietary_restrictions: userData.dietary_restrictions || [],
      created_at: new Date().toISOString()
    };
    mockUsersDB.push(newUser);
    return newUser;
  }

  async updatePalate(userId, palateVector, dietaryRestrictions) {
    const user = await this.findById(userId);
    if (!user) return null;
    if (palateVector) user.palate_vector = palateVector;
    if (dietaryRestrictions) user.dietary_restrictions = dietaryRestrictions;
    return user;
  }
}

export const userRepository = new UserRepository();
