const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const { response } = require('../app.js');

module.exports = class UserService {
    
  static async createUser({ email, password }) {
        
    const existingUser = await User.findEmails(email);
        
    if(existingUser) {
      const error = new Error();
      error.status = 400;
      error.message = 'User already exists';
      throw error;
    }
        
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
            
    const user = await User.insert({
      email,
      passwordHash,
    });
            
    return user;
  }

  static async auth({ email, password }) {
    const existingUser = await User.findEmails(email);

    if (!existingUser) {
      throw new Error('Invalid email/password');
    }

    // if(!existingUser) {
    //   const error = new Error();
    //   error.status = 401;
    //   error.message = 'Invalid email/password';
    //   throw error;
    // }

    const matchPass = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!matchPass) {
      const error = new Error();
      error.status = 401;
      error.message = 'Invalid email/password';
      throw error;
    }
    return existingUser;
  }
};

    
