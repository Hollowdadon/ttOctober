const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = async ({ app }) => {
  app.enable('trust proxy');

  app.use(cors());
  app.use(require('morgan')('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // ...More middlewares

  // rotes
  app.use('/status', require('../api/status'));
  app.use('/auth', require('../api/auth'));
  app.use('/', require('../api/userInfo'));

  // Return the express app
  return app;
};
