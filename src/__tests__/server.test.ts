import request from "supertest";
import app from "../server.ts";
describe("Sever tests", () => {
  it("Should send back a JSON response", async () => {
    const res = await request(app).get("/api/products");

    console.log(res);
  });
});
