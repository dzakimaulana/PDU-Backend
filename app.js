const express = require('express');
const app = express();

const imageRoutes = require('./app/routes/imageRoutes');

module.exports = (config) => {
  const { log } = config;

  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  app.use(express.json());
  app.use('/api/images', imageRoutes);

  app.use((error, req, res, next) => {
    if (error) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          log.error('File size exceeds limit');
          return res.status(400).send({ error: 'File size exceeds limit' });
        };
      };
    }
    log.error(error);
    return res.status(error.status || 500).json({
      message: 'Internal server error',
    });
  });

  return app;
};
