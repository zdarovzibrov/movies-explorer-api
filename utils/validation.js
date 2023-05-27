const { celebrate, Joi } = require('celebrate');
const { REGEXP } = require('../utils/constants');

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const editProfileUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEXP),
    trailerLink: Joi.string().required().pattern(REGEXP),
    thumbnail: Joi.string().required().pattern(REGEXP),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    moviesId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  editProfileUserValidation,
  createMovieValidation,
  movieIdValidation,
  signupValidation,
  signinValidation,
};
