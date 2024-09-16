const request = require('supertest');
const app = require('../../app');

describe("Image upload route", () => {
  it("should return 400 for non-image file types", async () => {
    const res = await request(app)
      .post("/api/images/upload")
      .attach("image", "path/to/testScript.py");
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      success: false,
      data: null,
      message: "Incorrect file format",
    });
  });

  it("should return 200 for correct image format", async () => {
    const res = await request(app)
      .post("/api/images/upload")
      .attach("image", "path/to/testImage.jpg");
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      success: true,
      data: expect.any(Array),
      message: null
    });
  });
});

describe("Image history route", () => {
  it("get image history and return 200 with data", async () => {
    const res = await request(app)
      .get("/api/image/history");
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toEqual({
      success: true,
      data: expect.any(Array),
      message: null
    });

    expect(Array.isArray(res.body.data)).toBe(true); 
    expect(res.body.data.length).toBeGreaterThan(0);
    
    const firstItem = res.body.data[0];
    expect(firstItem).toHaveProperty('time');
    expect(firstItem).toHaveProperty('image');
    expect(firstItem).toHaveProperty('volume');
  })
})
