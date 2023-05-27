const authRouter = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../utils/validation');

authRouter.post('/signup', signupValidation, createUser);
authRouter.post('/signin', signinValidation, login);

module.exports = authRouter;