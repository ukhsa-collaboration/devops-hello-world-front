import { describe, expect, it } from "vitest";
import { buildMessageUrl, extractMessage } from "./message";

describe("buildMessageUrl", () => {
  it("joins the base URL and message path without double slashes", () => {
    expect(buildMessageUrl("https://example.com/")).toBe(
      "https://example.com/v1/message/1",
    );
  });

  it("throws when the base URL is empty", () => {
    expect(() => buildMessageUrl("")).toThrowError(
      "API base URL must be provided.",
    );
  });
});

describe("extractMessage", () => {
  it("returns the message string when present", () => {
    expect(extractMessage({ message: "Hello" })).toBe("Hello");
  });

  it("throws when the payload does not contain a string message", () => {
    expect(() => extractMessage({})).toThrowError(
      "Unexpected response format when loading the message.",
    );
  });
});
