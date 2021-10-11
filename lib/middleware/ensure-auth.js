
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { userId } = req.cookies;
  try {
    req.userId = jwt.verify(userId, process.env.APP_SECRET);
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
