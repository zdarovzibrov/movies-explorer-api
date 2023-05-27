const usersRouter = require('express').Router();
const {
  getUserById,
  editProfile,
} = require('../controllers/users');
const { editProfileUserValidation } = require('../utils/validation');

usersRouter.get('/me', getUserById);
usersRouter.patch('/me', editProfileUserValidation, editProfile);

module.exports = usersRouter;