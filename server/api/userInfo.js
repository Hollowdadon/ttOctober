const express = require('express');
const userInfo = express.Router();

const { isAuthenticated, isAdmin } = require('../middlewares');
const UserInfoService = require('../services/userInfo');

const { list, add } = new UserInfoService();

userInfo
  .get('/', [isAuthenticated, isAdmin], list)
  .post('/', add);

module.exports = userInfo;
