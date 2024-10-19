const express = require('express');
const fileUpload = require('express-fileupload');
const { logger } = require('./config');
const volumeRoutes = require('./app/routes/volume');
require('dotenv').config;

const app = express();

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/volumes', volumeRoutes);

// Error handling
app.use((err, req, res) => {
  logger.error({
      message: err.message,
      stack: err.stack, // Log the stack trace for debugging
      statusCode: err.status || 500,
  });

  res.status(err.status || 500).json({
      status: "error",
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

