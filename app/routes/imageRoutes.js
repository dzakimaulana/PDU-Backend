const express = require('express');
const imageChecker = require('../middlewares/imageMiddleware');
const imageController = require('../controllers/imageController');

const imageRoutes = express.Router();

imageRoutes.post('/upload', imageChecker, imageController.uploadImage);

module.exports = imageRoutes;
