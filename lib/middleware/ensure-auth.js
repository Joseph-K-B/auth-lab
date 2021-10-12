
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { userId } = req.cookies;
    req.user = jwt.verify(userId, process.env.APP_SECRET);
    
    console.log('AT ENSURE AUTH', req.user);

    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
  
};


// if(!userId) {
//   throw new Error('Please sign in');
// }

// req.userId = userId;
    
// next();
