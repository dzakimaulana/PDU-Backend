const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const uploadRoutes = require('./app/routes/imageRoutes.js');
const imageRoutes = require('./app/routes/imageRoutes');

// Middleware untuk mengizinkan akses CORS (diperlukan untuk komunikasi dengan frontend)
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folder uploads untuk file gambar yang diupload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', uploadRoutes);

// Export konfigurasi app dengan logger
module.exports = (config) => {
  const { log } = config;

  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  // Route tambahan dari branch dev
  app.use('/api/images', imageRoutes);

  // Error handling untuk file upload menggunakan multer
  app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        log.error('File size exceeds limit');
        return res.status(400).send({ error: 'File size exceeds limit' });
      }
    }
    log.error(error);
    return res.status(error.status || 500).json({
      message: 'Internal server error',
    });
  });

  return app;
};
