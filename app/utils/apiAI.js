const axios = require('axios');
const FormData = require('form-data');
const log = require('../utils/logger');

const urlAI = "http://127.0.0.1:5000/upload";

const sendAI = async (file) => {
  try {
    const form = new FormData();

    if (file && file.data && file.name) {
      // Assuming file.data is a Buffer or a Stream and file.name is the original filename
      form.append('file', file.data, file.name);
    } else {
      log.error("Invalid file object provided.");
      return { success: false, data: null };
    }

    const response = await axios.post(urlAI, form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    return { success: true, data: response.data }
  } catch (error) {
    log.error(`Error occurred during image upload: ${error.message}`);
    return { success: false, data: null };
  }
};

module.exports = sendAI;