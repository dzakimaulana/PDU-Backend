const { Point } = require('@influxdata/influxdb-client');
const { influxDB } = require('../config');
const { writeApi, queryApi, bucket } = influxDB;

const insertVolume = async (value) => {
  try {
    const point = new Point('volume')
      .tag('manual', 'MV')
      .floatField('value', value);

    await writeApi.writePoint(point);
    await writeApi.close();

    return { success: true };
  } catch (error) {
    console.error(`Error writing data to InfluxDB: ${error.message}`);
    return { success: false, message: error.message };
  }
};

const readVolume = async (limit = 10) => {
  try {
    const query = `
      from(bucket: "${bucket}")
      |> range(start: 0)
      |> filter(fn: (r) => r._measurement == "volume")
      |> sort(columns: ["_time"], desc: true)
      |> limit(n: ${limit})
    `;

    const result = [];
    await queryApi.queryRows(query, {
      next(row, tableMeta) {
        result.push(tableMeta.toObject(row));
      },
      error(error) {
        throw new Error(error);
      },
      complete() {
        console.log('Query complete.');
      }
    });
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error reading data from InfluxDB: ${error.message}`);
    return { success: false, message: error.message };
  }
};


module.exports = {
  insertVolume,
  readVolume,
};
