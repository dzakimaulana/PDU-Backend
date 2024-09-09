const app = require('./app');
const connectDB = require('./config');
const PORT = process.env.APP_PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
  catch (err) {
    console.error('Failed to connect to the database', err);
    process.exit(1);
  }
}

startServer();