const { uploadImage } = require('../controllers/imageController');
const httpMocks = require('node-mocks-http');

jest.mock('../services/imageService');
jest.mock('../utils/apiAI');

const imageService = require('../services/imageService');
const apiAI = require('../utils/apiAI');

describe('Image Controller', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  describe('When no image is uploaded', () => {
    it('should return 400', async () => {
      req.file = undefined;

      await uploadImage(req, res);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'No file uploaded' });
    });
  });

  describe('When an image is uploaded', () => {
    it('should return 200 and process the image', async () => {
      req.file = { file: '../../assets/tests/testSuccess.jpg' };
      const dynamicVolume = 100;
      const fixedDate = new Date();
      jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);

      const mockResAI = { data: { volume: 100 } };
      apiAI.sendImage.mockResolvedValue(mockResAI);

      imageService.insertVolume.mockResolvedValue();
      await uploadImage(req, res);

      expect(apiAI.sendImage).toHaveBeenCalledWith(req.file);
      expect(imageService.insertVolume).toHaveBeenCalledWith(dynamicVolume, fixedDate);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        message: 'File uploaded successfully',
        data: {
          volume: dynamicVolume,
          time: fixedDate.toISOString(),
        },
      });
    });
  });
});
