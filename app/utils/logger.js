const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();

module.exports = log;