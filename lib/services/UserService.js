const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

module.exports = class UserService {
    
  static async createUser({ email, password }) {
        
    const existingUser = await User.findEmails(email);
        
    if(existingUser) {
      throw new Error('User already exists');
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

  //   static async auth({ email, password }) {
  //     const existingUser = await User.findEmails(email);

//     if(!existingUser) {
//       throw new Error('invalid email/password');
//     }
//   }
};

    
