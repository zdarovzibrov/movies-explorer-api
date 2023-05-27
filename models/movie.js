const mongoose = require('mongoose');
const {REGEXP} = require('../utils/constants')

const movieShema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },

    director: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
      validate: {
        validator: (value) => REGEXP.test(value),
        message: 'Ваша ссылка невалидна'
      },
    },

    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (value) => REGEXP.test(value),
        message: 'Ваша ссылка невалидна'
      },
    },

    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (value) => REGEXP.test(value),
        message: 'Ваша ссылка невалидна'
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },

    movieId: {
      type: Number,
      required: true,
    },

    nameRU: {
      type: String,
      required: true,
    },

    nameEN: {
      type: String,
      required: true,
    },
  },{versionKey: false});

module.exports = mongoose.model('movie', movieShema);
