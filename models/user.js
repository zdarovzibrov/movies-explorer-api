const mongoose = require ('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const { REGEXP } = require('../utils/constants');

const userShema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: 'Не правильный email.',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    }
  },{versionKey: false});

module.exports = mongoose.model('user', userShema);
