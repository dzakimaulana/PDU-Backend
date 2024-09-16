const config = require('./config')[process.env.NODE_ENV || 'development'];
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.postgres.options);
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