const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { appLogger, errorLogger } = require('./config/logger');
const volumeRoutes = require('./routes/volume');
const morganMiddleware = require('./middlewares/morganMiddleware');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morganMiddleware);

// Routes
app.use('/api/volumes', volumeRoutes);

// 404 Not Found handling
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});

// Error handling
app.use((err, req, res, next) => {
    errorLogger.error({
        message: err.message,
        stack: err.stack,
        statusCode: err.status || 500,
    });

    res.status(err.status || 500).json({
        status: "error",
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => appLogger.info(`Server running on port ${PORT}`));

