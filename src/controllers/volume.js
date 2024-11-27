const { v4: uuidv4 } = require('uuid');
const sendAI = require('../utils/aiImageUploader');
const volumeService = require('../services/volume');
const { producePublicURL } = require('../utils/firebaseImage');
const { errorLogger } = require('../config/logger');

const uploadImage = async (req, res) => {
  try {
    const resultSA = await sendAI(req.files.file);
    if (!resultSA.success) {
      return res.status(400).json({
        message: 'Error imageService in uploadImage',
      })
    }

    const fileName = `${uuidv4()}.jpg`;

    const percentageArea = resultSA.data.percentage_area;
    const numberOfStones = resultSA.data.number_of_stones;
    const imageHex = resultSA.data.image_hex;

    const resultPU = await producePublicURL(imageHex, fileName);
    if (!resultPU.success) {
      return res.status(400).json({
        status: "error",
        message: 'Error upload Image in Firebase',
      })
    }
    const imageURL = resultPU.data.url;

    const result = await volumeService.insertVolume(percentageArea, numberOfStones, imageURL);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: 'Error insert in data image',
      })
    }
    
    return res.status(200).json({
      status: "success",
      message: 'File uploaded successfully',
      data: {
        percentage_area: percentageArea,
        number_of_stones: numberOfStones,
        image_url: imageURL
      }
    });
    // Future tasks (like sending image to AI, WebSocket update) go here
  } catch (error) {
    errorLogger.error({
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({
      status: "error",
      message: `Error happen in uploadImage: ${error}`,
    })
  }
};

const getAllVolume = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    if (limit <= 0) {
      return res.status(400).json({
        status: "error",
        message: 'Invalid limit parameter. Must be a positive number.',
      });
    }

    const result = await volumeService.readVolume(limit);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: `Error fetching volume data: ${result.message}`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    errorLogger.error({
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({
      status: "error",
      message: `Error occurred while retrieving volume data: ${error.message}`,
    });
  }
};

module.exports = {
  uploadImage,
  getAllVolume
};
