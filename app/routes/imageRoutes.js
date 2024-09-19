const express = require('express');
const upload = require('../middlewares/imageMiddleware');
const imageController = require('../controllers/imageController');

const imageRoutes = express.Router();

imageRoutes.post('/upload', upload.single('image'), imageController.uploadImage);
imageRoutes.get('/', (req, res) => {
  res.send('Image route');
});
imageRoutes.get('/hello/', imageController.hello);

module.exports = imageRoutes;
