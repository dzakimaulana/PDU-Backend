const Volume = require('../src/models/imageModel');
const imageService = require('../src/services/volume');
const log = require('../src/utils/logger');

jest.mock('../models/imageModel');
jest.mock('../utils/logger');

describe("Insert volume", () => {
  const volume = 100;
  const time = new Date();

  it("should insert a volume and log success", async () => {
    const result = await imageService.insertVolume(volume, time);

    expect(Volume.create).toHaveBeenCalledWith({
      volume: volume,
      time: time,
    });

    expect(log.info).toHaveBeenCalledWith('Record inserted successfully');
    expect(result.success).toBe(true);
  });

  it('should log an error if inserting fails', async () => {
    const mockError = new Error('Database Error');
    Volume.create.mockRejectedValue(mockError);

    const result = await imageService.insertVolume(volume, time);

    expect(Volume.create).toHaveBeenCalledWith({
      volume: volume,
      time: time,
    });

    expect(log.error).toHaveBeenCalledWith(`Error inserting record: ${mockError.message}`)
    expect(result.success).toBe(false);
  });
});