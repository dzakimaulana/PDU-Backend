const morgan = require('morgan');
const { accessLogger } = require('../config/logger');

const morganFormat = ":method :url :status :response-time ms";

const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logObject = {
        method: message.split(' ')[0],
        url: message.split(' ')[1],
        status: message.split(' ')[2],
        responseTime: message.split(' ')[3],
      };
      accessLogger.info(`incoming-request`, logObject);
    }
  }
})

module.exports = morganMiddleware;