const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const { influxUrl, influxToken, influxOrg, influxBucket } = require('../config/influxdb');
const  { errorLogger, appLogger } = require('../config/logger');

const influxDB = new InfluxDB({
  url: influxUrl,
  token: influxToken,
});

const writeApi = influxDB.getWriteApi(influxOrg, influxBucket, 'ns');
const queryApi = influxDB.getQueryApi(influxOrg);

const measurement = "Volume";

const insertVolume = async (percentageArea, numberOfStones, imageURL) => {
  try {
    const point = new Point(measurement)
      .tag('retrieve', 'manual')
      .floatField('percentage_area', percentageArea)
      .intField('number_of_stones', numberOfStones)
      .stringField('image_url', imageURL);
      
    writeApi.writePoint(point);
    await writeApi.flush();
    appLogger.info('Store data to InfluxDB');
    
    return { success: true };
  } catch (error) {
    errorLogger.error({
      message: error.message,
      stack: error.stack
    });
    return { success: false, message: error.message };
  }
};

const readVolume = async (limit = 10) => {
  try {
    const query = `
      from(bucket: "${influxBucket}")
      |> range(start: 0)
      |> filter(fn: (r) => r["_measurement"] == "${measurement}")
      |> pivot(
          rowKey:["_time"],
          columnKey: ["_field"],
          valueColumn: "_value"
        )
      |> filter(fn: (r) => r["retrieve"] == "manual")
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
            percentage_area: o.percentage_area,
            number_of_stones: o.number_of_stones,
            image_url: o.image_url
          });
        },
        error(error) {
          console.error(`Error in query callback: ${error.message}`);
          reject({ success: false, message: error.message });
        },
        complete() {
          resolve({ success: true, data: result });
        }
      });
    });
  } catch (error) {
    errorLogger.error({
      message: error.message,
      stack: error.stack
    });
    return { success: false, message: error.message };
  }
};

module.exports = {
  insertVolume,
  readVolume,
};
