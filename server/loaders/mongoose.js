const mongoose = require('mongoose');
const { dbUrl } = require('../config');

module.exports = async () => {
  const connection = await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  return connection.connection.db;
};
