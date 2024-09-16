const Volume = require('../models/imageModel');
const log = require('../utils/logger');

const insertVolume = async (volume, time) => {
  try {
    await Volume.create({
      volume: volume,
      time: time,
    });
    log.info('Record inserted successfully');
  } catch (error) {
    log.error('Error inserting record:', error);
  }
};

module.exports = insertVolume;