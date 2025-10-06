import { describe, expect, it } from "vitest";

const FRONT_BASE_URL = process.env.FRONT_BASE_URL;

describe("frontend availability", () => {
  it("responds successfully at the configured base URL", async () => {
    if (!FRONT_BASE_URL) {
      throw new Error("FRONT_BASE_URL environment variable is not set");
    }

    const response = await fetch(FRONT_BASE_URL);

    expect(response.ok).toBe(true);
    expect(response.status).toBeLessThan(500);
  });
});
