const express = require('express');
const router = express.Router();
const upload = require('../middlewares/imageMiddleware');
const uploadController = require('../controllers/imageController');

// Route untuk upload file
router.post('/upload', upload.single('file'), uploadController.uploadImage);

module.exports = router;

