const { Router } = require('express');
const User = require('../models/User.js');
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
  
  .get('/signup', async (req, res, next) => {
    try {
      const getUsers = await User.findEmails();
      console.log('AT USER CONTROLLER', getUsers);
      res.json(getUsers);
    } catch (err) {
      next(err);
    }
  });

 
