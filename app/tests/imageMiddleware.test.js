const httpMocks = require('node-mocks-http');
const imageChecker = require('../middlewares/imageMiddleware'); // Adjust the path accordingly

describe('Image Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  describe('When image size is more than 500kb', () => {
    it('should return 400 if the file size exceeds 500KB', () => {
      // Simulate a file larger than 500 KB
      req.files.file = {
        originalname: 'largeImage.jpg',
        mimetype: 'image/jpeg',
        size: 600 * 1024 // Simulated size
      }

      imageChecker(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'File size exceeds 500KB limit.' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('When non-image file is uploaded', () => {
    it('should return 400 if the file type is not JPEG or PNG', () => {
      // Simulate a non-image file
      req.files.file = {
        originalname: 'test.php',
        mimetype: 'text/php',
        size: 100 * 1024 // Simulated size
      };

      imageChecker(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getJSONData()).toEqual({ message: 'Only JPEG and PNG files are allowed.' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('When a valid image is uploaded with size less than 500kb', () => {
    it("should call next if the file is valid (PNG and within size limit)'", () => {
      req.files.file = {
        originalname: 'validImage.jpg',
        mimetype: 'image/jpeg',
        size: 100 * 1024 // Simulated valid size
      };

      imageChecker(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
