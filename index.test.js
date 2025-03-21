import request from "supertest";
import app from "./index"; // Make sure this path is correct

describe("API Tests", () => {
    it("should return a greeting message from the root endpoint", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello from CI CD Demo App");
    });

    it("should return a personalized greeting message with the name from query parameter", async () => {
        const response = await request(app).post("/api/hello").query({ name: "John" });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Hello John");
    });

    it("should return a default greeting message when no name is provided", async () => {
        const response = await request(app).post("/api/hello");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Hello Shiv");
    });
});