const { Router } = require('express');
// const User = require('../models/User.js');
const UserService = require('../services/userService.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try{
      const savedUser = await UserService.createUser(req.body);

      res.send(savedUser);
    } catch (err) {
      err.status = 400;
      next(err);
    }
  })
  


  .post('/login', async (req, res, next) => {
    try{
      const logUser = await UserService.auth(req.body);

      res.cookie('userId', logUser.id, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24      
      });

      res.send(logUser);
    } catch (err) {
      err.status = 401;
      next(err);
    }
  });

