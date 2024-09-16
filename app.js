const express = require('express');
const app = express();

const imageRoutes = require('./routes/imageRoutes');

module.exports = (config) => {
  const log = config.log();

  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  app.use(express.json());
  app.use('/api/images', imageRoutes);

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });

  return app;
};
