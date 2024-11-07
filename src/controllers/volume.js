const sendAI = require('../utils/aiImageUploader');
const volumeService = require('../services/volume');

const uploadImage = async (req, res) => {
  try {
    const resultSA = await sendAI(req.files.file);
    if (!resultSA.success) {
      return res.status(400).json({
        message: 'Error imageService in uploadImage',
      })
    }

    const rockAreaPercentage = resultSA.data.rock_area_percentage;
    // console.log(rockAreaPercentage);
    // const volume = Math.floor(rockAreaPercentage);
    // console.log(volume);

    const result = await volumeService.insertVolume(rockAreaPercentage);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: 'Error insert in data image',
      })
    }
    
    return res.status(200).json({
      status: "success",
      message: 'File uploaded successfully',
    });
    // Future tasks (like sending image to AI, WebSocket update) go here
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: `Error happen in uploadImage: ${error}`,
    })
  }
};

const getAllVolume = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    console.log(limit);
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
