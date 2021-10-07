const { Router } = require('express');
const User = require('../models/User.js');
const UserService = require('../services/userService.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try{
      const savedUser = await UserService.createUser(req.body);

      res.send(savedUser);
      console.log('AT USER CONTROLLER', savedUser);
    } catch (err) {
      next(err);
    }
  })

 
