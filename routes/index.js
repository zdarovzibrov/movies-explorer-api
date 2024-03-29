const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const authRouter = require('./auth');

router.use(authRouter);
router.use(auth);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
