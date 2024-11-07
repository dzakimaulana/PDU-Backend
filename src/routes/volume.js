const express = require('express');
const validateImageUpload = require('../middlewares/uploadValidators');
const volumeController = require('../controllers/volume');

const volumeRoutes = express.Router();

volumeRoutes.post('/upload', validateImageUpload, volumeController.uploadImage);
volumeRoutes.get('/', volumeController.getAllVolume);

module.exports = volumeRoutes;
