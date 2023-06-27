require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized');
const NotFoundError = require('../errors/notfound');
const ConflictError = require('../errors/conflict');
const BadRequestError = require('../errors/badrequest');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    email, password, name
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email, name, password: hash
    })
      .then((newUser) => res.status(201).send({
        name: newUser.name,
        email: newUser.email
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(
            new ConflictError('Пользователь с таким email уже существует.')
          );
        } else if (err.name === 'ValidationError') {
          next(
            new BadRequestError('Некорректные данные при создании пользователя.')
          );
        } else {
          next(err);
        }
      });
  })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пользователь не найден.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Не правильно указан логин или пароль.'));
          }

          const token = jwt.sign(
            { _id: user._id },

            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' }
          );
          return res.send({ token });
        });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Информация о пользователе не найдена.');
      }
      return res.send(user);
    })
    .catch(next);
};

const editProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Информация о пользователе не найдена.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError('Некорректные данные при редактировании профиля.')
        );
      } else if (err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже существует.')
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserById,
  editProfile,
  createUser,
  login,
};
