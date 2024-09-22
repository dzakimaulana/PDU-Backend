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

  // 404 Not Found handler
  app.all('*', (req, res) => {
    res.status(404).json({
      message: "Page not found"
    });
  });

  // Error Handler
  app.use((error, req, res, next) => {
    const statusCode = error.status || (error instanceof multer.MulterError ? 400 : 500);
    return res.status(statusCode).json({
      message: error.message || 'Internal Server Error'
    });
  });

  // // Error handling middleware
  // app.use((error, req, res, next) => {
  //   if (error) {
  //     if (error instanceof multer.MulterError) { 
  //       if (error.code === 'LIMIT_FILE_SIZE') { 
  //         log.error('File size should not exceed 500 KB');
  //         return res.status(400).send({ message: 'File size should not exceed 500 KB' });
  //       }
  //     }
  //     if (error.message === 'Only images with .jpg, .jpeg, or .png extensions are allowed') {
  //       return res.status(400).json({ message: error.message });
  //     }
  //     return res.status(500).json({ message: 'Internal server error', error: errror.message });
  //   }
  //   next();
  // });

  return app;
};
