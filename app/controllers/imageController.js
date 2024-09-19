const imageService = require("../services/imageService");
const log = require('../utils/logger');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded'
      });
    }

    const currentTime = new Date();
    const volume = 75;

    const resultIS = await imageService.insertVolume(volume, currentTime);
    if (!resultIS.success) {
      throw new Error('Error imageService in uploadImage');
    }
    
    log.info(`File upload and data insertion successful at ${currentTime}`);
    return res.status(200).json({
      message: 'File uploaded successfully',
      data: {
        volume,
        time: currentTime,
      },
    });
    // Future tasks (like sending image to AI, WebSocket update) go here
  } catch (error) {
    throw new Error(`Error happen in uploadImage: ${error}`);
  }
};

const hello = async (req, res) => {
  console.log('aduuhhhhhh');
  res.status(200).json({
    message: 'File uploaded successfully',
    data: {
      volume: 100
    },
  });
};

module.exports = {
  uploadImage,
  hello,
};
