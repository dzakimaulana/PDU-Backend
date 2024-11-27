
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const { errorLogger, appLogger } = require('../config/logger');

const AI_ENDPOINT = process.env.AI_ENDPOINT || "http://localhost:5000";

const uploadImageToAI = async (imageFile) => {
  try {
    if (!imageFile || !imageFile.data || !imageFile.name) {
      return { success: false, message: "Invalid file provided", data: null };
    }

    const formData = new FormData();
    formData.append('file', imageFile.data, imageFile.name);

    const response = await axios.post(`${AI_ENDPOINT}/process_image`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    appLogger.info('Hit AI endpoint');

    return { success: true, data: response.data };
  } catch (error) {
    errorLogger.error({
      message: error.message,
      stack: error.stack
    });
    return { success: false, message: error.message };
  }
};

module.exports = uploadImageToAI;
