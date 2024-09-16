const config = require('./config')[process.env.NODE_ENV || 'development'];
const app = require('./app')(config);
const http = require('http');
const { connectToPostgres } = require('./database');
// const { Server } = require('socket.io');

const log = config.log()
const PORT = config.app.port
const server = http.createServer(app);
// const io = new Server(server);

const startServer = async () => {
  try {
    const postgresClient = await connectToPostgres();
    config.postgres.client = postgresClient;

    await postgresClient.sync();

    // for listener

    server.listen(PORT, () => {
      log.info(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    log.error('Failed to start the server:', err);
    process.exit(1);
  }
};

startServer();