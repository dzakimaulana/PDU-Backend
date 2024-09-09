const fetchAIResponse = require("../utils/apiAI")
const fetch = require("node-fetch");
jest.mock("node-fetch");

describe("Send image to AI", () => {
  it("should return volume stone in that image", async () => {
    const mockData = { success: true, data: { volume: 12 } };
    const mockImageBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

    fetch.mockResolvedValue(new Response(JSON.stringify(mockData), { status: 200 }));
    expect(fetch).toHaveBeenCalledWith('https://example-ai-api.com/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': "image/png",
      },
      body: mockImageBuffer,
    });

    const result = await fetchAIResponse(mockImageBuffer);
    expect(result).toEqual(mockData);
  });

  it('should throw an error when fetch response is not ok', async () => {
    const mockImageBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

    fetch.mockResolvedValue(new Response(null, { status: 500 }));

    await expect(fetchAIResponse(mockImageBuffer)).rejects.toThrow('Fetch failed: Network response was not ok');
  });
})