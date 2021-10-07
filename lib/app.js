const express = require('express');
const userController = require('./controllers/auth.js');

const app = express();

app.use(express.json());
app.use('/api/v1/auth', userController);

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
