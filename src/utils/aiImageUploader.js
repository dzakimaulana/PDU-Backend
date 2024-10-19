
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config;

const AI_ENDPOINT = process.env.AI_ENDPOINT;

const uploadImageToAI = async (imageFile) => {
  try {
    if (!imageFile || !imageFile.data || !imageFile.name) {
      return { success: false, message: "Invalid file provided", data: null };
    }

    const formData = new FormData();
    formData.append('file', imageFile.data, imageFile.name);

    const response = await axios.post(AI_ENDPOINT, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Failed to upload image: ${error.message}`);
    return { success: false, message: error.message };
  }
};

module.exports = uploadImageToAI;
