const { Router } = require('express');
// const User = require('../models/User.js');
const UserService = require('../services/userService.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try{
      const savedUser = await UserService.createUser(req.body);

      res.send(savedUser);
    } catch (err) {
      next(err);
    }
  })
  


  .post('/login', async (req, res, next) => {
    try{
      const logUser = await UserService.auth(req.body);
      res.send(logUser);
    } catch (err) {
      next(err);
    }
  });

