const imageService = require("../services/imageService");
const log = require('../utils/logger');
// const apiAI = require('../utils/apiAI');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({
        message: 'No file uploaded'
      })
    }

    const currentTime = new Date();
    const volume = 75;

    await imageService.insertVolume(volume, currentTime);

    res.status(200).json({
      message: 'File uploaded successfully',
      data: {
        volume,
        time: currentTime,
      },
    });
    log.info(`File upload and data insertion successful with time ${currentTime}`);
    // set time
    // send image to the AI
    // adding new data to database
    // send data to frontend using websocket
  } catch (error) {
    log.error('Error in uploading file or inserting data:', error);
    res.status(500).json({
      message: 'Server error. Unable to process the request',
    });
  }
}

module.exports = uploadImage;