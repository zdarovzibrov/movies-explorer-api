const NotFoundError = require('../errors/notfound');
const BadRequestError = require('../errors/badrequest');
const ForbiddenError = require('../errors/forbidden');

const Movie = require('../models/movie');

const getOwnMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильмы не найдены.');
      }
      return res.send(movie);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params.moviesId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с таким идентификатором не найден.');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав на удаление этого фильма.');
      } else {
        return Movie.deleteOne({ _id: req.params.moviesId })
          .then((data) => { res.status(200).send(data); });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные.'));
      }
      return next(err);
    });
};

module.exports = {
  getOwnMovie,
  createMovie,
  deleteMovie
};
