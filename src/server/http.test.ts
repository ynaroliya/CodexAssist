import { describe, expect, it } from "vitest";
import { apiError, jsonBody } from "./http";
import { AppError } from "./user-management/domain";

describe("BFF HTTP boundary", () => {
  it("rejects malformed JSON without exposing parser details", async () => {
    await expect(jsonBody(new Request("http://local.test", { method: "POST", body: "{" }))).rejects.toMatchObject({ status: 400, message: "A valid JSON request body is required." });
  });

  it("maps expected and unexpected failures to safe responses", async () => {
    const expected = apiError(new AppError(403, "Forbidden"));
    expect(expected.status).toBe(403);
    await expect(expected.json()).resolves.toEqual({ error: "Forbidden" });
    const unexpected = apiError(new Error("sensitive implementation detail"));
    expect(unexpected.status).toBe(500);
    await expect(unexpected.json()).resolves.toEqual({ error: "The request could not be completed." });
  });
});
