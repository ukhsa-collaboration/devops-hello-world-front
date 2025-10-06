const TRAILING_SLASH_REGEX = /\/$/;

export function buildMessageUrl(baseUrl: string): string {
  if (!baseUrl) {
    throw new Error("API base URL must be provided.");
  }

  const normalisedBase = baseUrl.replace(TRAILING_SLASH_REGEX, "");
  return `${normalisedBase}/v1/message/1`;
}

export function extractMessage(payload: unknown): string {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload &&
    typeof (payload as { message: unknown }).message === "string"
  ) {
    return (payload as { message: string }).message;
  }

  throw new Error("Unexpected response format when loading the message.");
}
