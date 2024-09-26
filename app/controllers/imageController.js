const imageService = require("../services/imageService");
const sendAI = require('../utils/apiAI');
const log = require('../utils/logger');

const uploadImage = async (req, res) => {
  try {
    const currentTime = new Date();

    const resultSA = await sendAI(req.files.file);
    if (!resultSA.success) {
      return res.status(400).json({
        message: 'Error imageService in uploadImage',
      })
    }
    
    const volume = Math.floor(resultSA.data.batu_percentage);;

    const resultIS = await imageService.insertVolume(volume, currentTime);
    if (!resultIS.success) {
      return res.status(400).json({
        message: 'Error insert in data image',
      })
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
    return res.status(500).json({
      message: `Error happen in uploadImage: ${error}`,
    })
  }
};

module.exports = {
  uploadImage,
};
