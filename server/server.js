const loaders = require('./loaders');
const express = require('express');

const { port } = require('./config');

const startServer = async () => {
  const app = express();

  await loaders.init({ app });

  app.listen(port, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`✅ The server is ready!`);
  });

  process.on('uncaughtException', (error) => {
    // this errors should be handled where they appears
    console.error('🐛 [FIXME] uncaughtException: ', error);
  });
}

startServer();
