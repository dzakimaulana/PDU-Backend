require('dotenv').config();
const config = require('./config')[process.env.NODE_ENV || 'development']; // Default to 'development' if NODE_ENV is not set
const app = require('./app')(config);
const http = require('http');
const { connectToPostgres } = require('./database');

const log = config.log(); // Get logger instance
const PORT = process.env.APP_PORT || 3000; // Default to 3000 if APP_PORT is not set
const server = http.createServer(app);

const startServer = async () => {
  try {
    const postgresClient = await connectToPostgres();
    config.postgres.client = postgresClient;

    await postgresClient.sync();

    server.listen(PORT, () => {
      log.info(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    log.error('Failed to start the server:', err);
    process.exit(1);
  }
};

startServer();
