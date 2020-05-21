import supertest from "supertest";
import createServer from "./index";
import assert from "assert";
const server = createServer();
const request = supertest(server);

describe("Basic Server Functionality", () => {
  it("Should respond with hello world", async () => {
    const resp = await request.get("/").expect(200);
    expect(resp.body === "hello world");
  });
});
