const express = require('express');
const status = express.Router();

// health checks
status.get('/', (req, res) => res.status(200).end());
status.head('/', (req, res) => res.status(200).end());

module.exports = status;
