const bunyan = require('bunyan');
const pjs = require('../package.json');

const { name, version } = pjs;
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    postgres: {
      options: {
        host: 'localhost',
        port: 5432,
        database: 'dev',
        username: 'postgres',
        password: 'postgres',
        dialect: 'postgres',
      },
      client: null,
      channel: 'data_update'
    },
    log: () => getLogger(name, version, 'debug'),
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    postgres: {
      options: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
      },
      client: null,
      channel: 'data_update'
    },
    log: () => getLogger(name, version, 'info'),
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal'),
  },
};