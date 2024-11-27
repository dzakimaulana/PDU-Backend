const { errorLogger } = require('./logger');
require('dotenv').config();

const influxUrl = process.env.INFLUX_URL || "http://localhost:8086";
const influxToken = process.env.INFLUX_TOKEN;
const influxOrg = process.env.INFLUX_ORG || "PDU";
const influxBucket = process.env.INFLUX_BUCKET || "Volumes";

if (!influxToken || !influxOrg || !influxBucket) {
  errorLogger.error("Program exit", new Error('Missing InfluxDB configuration in environment variables'));
  process.exit(1);
}

module.exports = {
  influxUrl,
  influxToken,
  influxOrg,
  influxBucket
}