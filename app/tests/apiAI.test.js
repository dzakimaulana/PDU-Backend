const fetchAIResponse = require("../utils/apiAI");
const app = require('../../app');
const axios = require("axios");

jest.mock("axios");

describe('sendImage func', () => {
  describe('When have correct requirement', () => {
    it('should return volume', async() => {
      const mockVolume = { volume: 100 };
      axios.post.mockResolvedValue({ data: mockVolume });
      
      const response = await fetchAIResponse(app).post('/data');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ data: mockVolume });
    });
  });
  describe('When AI give error', () => {
    it('should return error message', async () => {
      const mockError = { message: 'Error during calculation'};

      axios.post.mockResolvedValue(mockError);

      const response = await fetchAIResponse(app).post('/data');

      expect(response.statuCode).toBe(400);
      expect(response.body).toEqual(mockError);
    });
  });
});