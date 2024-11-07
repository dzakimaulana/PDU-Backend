require('dotenv').config();

const influxUrl = process.env.INFLUX_URL;
const influxToken = process.env.INFLUX_TOKEN;
const influxOrg = process.env.INFLUX_ORG;
const influxBucket = process.env.INFLUX_BUCKET;

if (!influxUrl || !influxToken || !influxOrg || !influxBucket) {
  throw new Error('Missing InfluxDB configuration in environment variables');
}

module.exports = {
  influxUrl,
  influxToken,
  influxOrg,
  influxBucket
}

