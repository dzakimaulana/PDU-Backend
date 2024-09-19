const config = require('../../config')[process.env.NODE_ENV];

const log = config.log();

module.exports = log;