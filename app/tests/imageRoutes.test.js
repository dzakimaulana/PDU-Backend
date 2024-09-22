const request = require('supertest');
const app = require('../../app');

describe('POST /api/images/upload', () => {
  describe('When file size exceeds 500 KB', () => {
    it('should return 400 and message', async () => {
      const imagePath = '../../assets/tests/testFailed.jpg';

      const response = await request(app)
        .post('/api/images/upload')
        .attach('file', imagePath);
      
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('File size should not exceed 500 KB');
    });
  });

  describe('When file is not an image format', () => {
    it('should return 400 and message', async () => {
      const nonImagePath = '../../assets/tests/test.txt'

      const response = await request(app)
        .post('/api/images/upload')
        .attach('file', nonImagePath);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Only images with .jpg, .jpeg, or .png extensions are allowed');
    });
  });

  describe('When file is in image format and less than 500 KB', () => {
    it('should return 200 and success message', async () => {
      const imagePath = '../../assets/tests/testSuccess.jpg';
      console.log(imagePath);

      const response = await request(app)
        .post('/api/images/upload')
        .attach('file', imagePath);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('File uploaded successfully');
      expect(Number.isInteger(response.body.data.volume)).toBe(true);
      expect(new Date(response.body.data.time).toISOString()).toBe(response.body.data.time);
    });
  });
});