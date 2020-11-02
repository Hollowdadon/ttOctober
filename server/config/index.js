// load configs
require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  ssnSecret: process.env.SSN_SECRET,
  passSaltFactor: process.env.PASS_SALT_FACTOR,
  jwtSecret: process.env.JWT_SECRET,
}
