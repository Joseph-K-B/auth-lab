const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth.js');
const User = require('../models/User.js');
const UserService = require('../services/UserService.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try{
      const user = await UserService.createUser({ ...req.body, roleTitle: 'QUEEN' });

      // console.log('AT AUTH CONTROLLER POST', user);

      res.cookie('userId', user.authToken(), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      });
      res.send(user);
    } catch (err) {
      err.status = 400;
      next(err);
    }
  })
  


  .post('/login', async (req, res, next) => {
    try{
      const user = await UserService.auth(req.body);

      res.cookie('userId', user.authToken(), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24      
      });

      res.send(user);
    } catch (err) {
      err.status = 401;
      next(err);
    }
  })

  .get('/me', ensureAuth, async (req, res, next) => {
    try {
      // const activeUser = await User.findById(req.userId);
  
      res.send(req.user);
    } catch(err) {
      next(err);
    }
  });

// .patch('/:id', ensureAuth, async (req, res, next) => {

// })

