const imageService = require("../services/imageService");
const log = require('../utils/logger');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data'); // Tambahkan ini

exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const filePath = req.file.path;
  const currentTime = new Date(); // Mengambil waktu sekarang
  const volume = 75; // Contoh volume (bisa disesuaikan dengan logika bisnis)

  try {
    // Bagian dari fitur-malik: Mengirim gambar ke endpoint eksternal
    const image = fs.createReadStream(filePath); // Ubah dari readFileSync menjadi createReadStream
    const form = new FormData();
    form.append('file', image); // Pastikan field name adalah 'file'

    const response = await axios.post('http://localhost:5000/upload', form, {
      headers: {
        ...form.getHeaders(), // Menggunakan headers dari FormData
      },
    });

    // Bagian dari dev: Menyimpan data ke database melalui imageService
    const resultIS = await imageService.insertVolume(volume, currentTime);
    if (!resultIS.success) {
      throw new Error('Error imageService in uploadImage');
    }

    log.info(`File upload and data insertion successful at ${currentTime}`);

    // Mengirim respons ke frontend
    res.status(200).json({
      message: 'File uploaded successfully',
      data: {
        uploadResponse: response.data, // Response dari server upload eksternal
        volume,
        time: currentTime,
      },
    });

    // Future tasks (like sending image to AI, WebSocket update) go here
  } catch (error) {
    console.error(`Error occurred during image upload: ${error.message}`);
    res.status(500).json({ message: 'Error processing image', error: error.message });
  } finally {
    // Menghapus file lokal setelah diproses
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
  }
};

module.exports = {
  uploadImage,
};
