require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const defaultError = require('./errors/default');
const { NotFoundError } = require('./errors/notfound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { URL_DB_DEV } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, URL_DB_PROD } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? URL_DB_PROD : URL_DB_DEV);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(router);

app.use(errors());
app.use(() => {
  throw new NotFoundError('Такого адреса не существует.');
});
app.use(errorLogger);
app.use(defaultError);

app.listen(PORT, () => {
  console.log(`This server is start on ${PORT}`);
});
