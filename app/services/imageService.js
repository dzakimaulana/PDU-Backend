const Volume = require('../models/imageModel');
const log = require('../utils/logger');

const insertVolume = async (volume, time) => {
  try {
    await Volume.create({
      volume: volume,
      time: time,
    });
    log.info('Record inserted successfully');
    return { success: true };
  } catch (error) {
    log.error(`Error inserting record: ${error.message}`)
    return { success: false };
  }
};

module.exports = {
  insertVolume,
};