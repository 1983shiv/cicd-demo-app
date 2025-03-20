import request from "supertest";
import app from "./index"; // Assuming the file is named "app.js"

describe("API Tests", () => {
    // Test GET request to "/"
    it("should return a greeting message from the root endpoint", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello from CI CD Demo App");
    });

    // Test POST request to "/api/hello"
    it("should return a personalized greeting message with the name from query parameter", async () => {
        const response = await request(app).post("/api/hello").query({ name: "John" });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Hello John");
    });

    // Test POST request to "/api/hello" without query parameter
    it("should return a default greeting message when no name is provided", async () => {
        const response = await request(app).post("/api/hello");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Hello Shiv"); // Default name
    });

});

