const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const { influxUrl, influxToken, influxOrg, influxBucket } = require('../config/influxdb');;

console.log(influxUrl);

const influxDB = new InfluxDB({
  url: influxUrl,
  token: influxToken,
});

const writeApi = influxDB.getWriteApi(influxOrg, influxBucket, 'ns');
const queryApi = influxDB.getQueryApi(influxOrg);

const insertVolume = async (value) => {
  try {
    const point = new Point('Volume')
      .tag('manual', 'MV')
      .floatField('value', value);

    await writeApi.writePoint(point);

    return { success: true };
  } catch (error) {
    console.error(`Error writing data to InfluxDB: ${error.message}`);
    return { success: false, message: error.message };
  }
};

const readVolume = async (limit = 10) => {
  try {
    const query = `
      from(bucket: "${influxBucket}")
      |> range(start: 0)
      |> filter(fn: (r) => r["_measurement"] == "Volume")
      |> filter(fn: (r) => r["_field"] == "value")
      |> sort(columns: ["_time"], desc: true)
      |> limit(n: ${limit})
    `;

    const result = [];
    
    return new Promise((resolve, reject) => {
      queryApi.queryRows(query, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          result.push({
            time: o._time,
            volume: o._value
          });
        },
        error(error) {
          console.error(`Error in query callback: ${error.message}`);
          reject({ success: false, message: error.message });
        },
        complete() {
          console.log(result);
          resolve({ success: true, data: result });
        }
      });
    });
  } catch (error) {
    console.error(`Error reading data from InfluxDB: ${error.message}`);
    return { success: false, message: error.message };
  }
};




module.exports = {
  insertVolume,
  readVolume,
};
