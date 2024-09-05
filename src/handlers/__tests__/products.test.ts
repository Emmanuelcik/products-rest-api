import request from "supertest";
import app from "../../server.ts";

describe("Product APIs", () => {
  it("shoudl create a new product", async () => {
    const response = await request(app).post("/api/products").send({
      name: "jsjs",
      price: 200,
    });
  });
});
