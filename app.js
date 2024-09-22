const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

const imageRoutes = require('./app/routes/imageRoutes');

module.exports = (config) => {
  const log = config.log();

  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      next();
    });
  }

  app.use(express.json());
  app.use(fileUpload());
  app.use('/api/images', imageRoutes);

  // 404 Not Found handler
  app.all('*', (req, res) => {
    res.status(404).json({
      message: "Page not found"
    });
  });

  // Error Handler
  app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      message: error.message || 'Internal Server Error'
    });
  });

  return app;
};
