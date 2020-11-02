const jwt = require('express-jwt');

const { jwtSecret } = require('../config');

module.exports = jwt({ secret: jwtSecret, algorithms: ['HS256'] });
