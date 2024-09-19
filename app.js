const express = require('express');
const multer = require('multer');
const app = express();

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
  app.use('/api/images', imageRoutes);

  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  // 404 Not Found handler
  app.use((error, req, res, next) => {
    res.status(404).json({
      message: error,
    });
  });

  // Error handling middleware
  app.use((error, req, res, next) => {
    if (error) {
      if (error instanceof multer.MulterError) { 
        if (error.code === 'LIMIT_FILE_SIZE') { 
          log.error('File size exceeds limit');
          return res.status(400).send({ error: 'File size exceeds limit' });
        }
      } else {
        log.error(error);
        return res.status(error.status || 500).json({
          message: 'Internal server error',
        });
      }
    }
    next();
  });

  return app;
};
