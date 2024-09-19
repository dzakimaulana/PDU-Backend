require('dotenv').config();
const config = require('../config')[process.env.NODE_ENV];
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.postgres.options.database, 
  config.postgres.options.user, 
  config.postgres.options.password, {
  host: config.postgres.options.host,
  dialect: config.postgres.options.dialect,
});
const log = config.log();

const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    log.info('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    log.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectToPostgres };