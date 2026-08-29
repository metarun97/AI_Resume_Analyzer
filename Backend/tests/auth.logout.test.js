import request from "supertest";
import app from "../src/app.js";

describe("GET /api/auth/logout", () => {
  it("should logout user successfully", async () => {
    const res = await request(app)
      .get("/api/auth/logout");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User logout successfully.");
  });

  it("should clear the token cookie", async () => {
    const res = await request(app)
      .get("/api/auth/logout");

    expect(res.headers["set-cookie"]).toBeDefined();

    const cookie = res.headers["set-cookie"].join("");

    expect(cookie).toContain("token=");
  });

  it("should return response in correct format", async () => {
    const res = await request(app)
      .get("/api/auth/logout");

    expect(res.body).toEqual({
      message: "User logout successfully.",
    });
  });
});
