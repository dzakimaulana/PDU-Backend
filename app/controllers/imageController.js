const imageService = require("../services/imageService");
const log = require('../utils/logger');
// const apiAI = require('../utils/apiAI');

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data'); // Tambahkan ini

exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const filePath = req.file.path;

  try {
    const image = fs.createReadStream(filePath); // Ubah dari readFileSync menjadi createReadStream

    const form = new FormData();
    form.append('file', image); // Pastikan field name adalah 'file'

    const response = await axios.post('http://localhost:5000/upload', form, {
      headers: {
        ...form.getHeaders(), // Menggunakan headers dari FormData
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing image', error: error.message });
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
  }
};

    // set time
    // send image to the AI
    // adding new data to database
    // send data to frontend using websocket