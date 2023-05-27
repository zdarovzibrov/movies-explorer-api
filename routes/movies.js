const moviesRouter = require('express').Router();
const {
  getOwnMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, movieIdValidation } = require('../utils/validation');

moviesRouter.get('/', getOwnMovie);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:moviesId', movieIdValidation, deleteMovie);

module.exports = moviesRouter;
