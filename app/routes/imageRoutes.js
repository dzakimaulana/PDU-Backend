const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const imageController = require('../controllers/imageController');

const imageRoutes = express.Router();

imageRoutes.post('/upload', upload.single('image'), imageController.uploadImage);

module.exports = imageRoutes;
