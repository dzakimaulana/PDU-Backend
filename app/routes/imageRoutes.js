const express = require('express');
const upload = require('../middlewares/imageMiddleware');
const imageController = require('../controllers/imageController');

const imageRoutes = express.Router();

imageRoutes.post('/upload', upload.single('file'), imageController.uploadImage);

module.exports = imageRoutes;
