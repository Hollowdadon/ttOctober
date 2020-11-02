const express = require('express');
const auth = express.Router();

const AuthService = require('../services/auth');

const { register, login } = new AuthService();

auth
  .post('/register', register)
  .post('/login', login);

module.exports = auth;
