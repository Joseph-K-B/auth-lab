module.exports = (req, res, next) => {
  try{
    if(req.user.title !== 'ADMIN') throw new Error('Unauthorized');

    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
