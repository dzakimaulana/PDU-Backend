const multer = require('multer');
const httpMocks = require('node-mocks-http'); // Ensure this is imported
const upload = require('../middlewares/imageMiddleware');

describe('Image Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  describe('When image size is more than 500kb', () => {
    it('should return error message', (done) => {
      req.file = {
        originalname: 'largeImage.jpg',
        mimetype: 'image/jpeg',
        size: 600 * 1024 // Simulate a 600 KB file
      };

      upload.single('file')(req, res, (err) => {
        expect(err).toEqual(expect.objectContaining({
          message: 'File size exceeds the limit of 500 KB'
        }));
        done();
      });
    });
  });

  describe('When non-image file is uploaded', () => {
    it('should return error message', (done) => {
      req.file = {
        originalname: 'test.php',
        mimetype: 'text/php',
        size: 100 * 1024 // Simulate a valid file size
      };

      upload.single('file')(req, res, (err) => {
        expect(err).toEqual(expect.objectContaining({
          message: 'Only images with .jpg, .jpeg, or .png extensions are allowed'
        }));
        done();
      });
    });
  });

  describe('When image is valid and size is less than 500kb', () => {
    it('should call next without errors', (done) => {
      req.file = {
        originalname: 'image.jpg',
        mimetype: 'image/jpeg',
        size: 100 * 1024 // Simulate a valid file size
      };

      upload.single('file')(req, res, (err) => {
        expect(err).toBeUndefined(); // No error should be passed to next
        done();
      });
    });
  });
});
