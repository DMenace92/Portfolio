function isMcpStdioMode() {
  return process.env["MCP_STDIO_MODE"] === "true";
}

function toSafeJson(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return "[unserializable]";
  }
}

function normalizeError(error) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack ?? "No stack trace available",
      cause: error && error.cause ? error.cause : undefined,
    };
  }

  return {
    name: "UnknownError",
    message: typeof error === "string" ? error : "Non-Error thrown",
    stack: typeof error === "object" ? toSafeJson(error) : String(error),
    cause: undefined,
  };
}

function timestamp() {
  return new Date().toISOString();
}

export const logger = {
  error(error, meta) {
    const parsed = normalizeError(error);
    const stackLines = String(parsed.stack)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const output = [
      "",
      "==================== ERROR ====================",
      `Time: ${timestamp()}`,
      `Name: ${parsed.name}`,
      `Message: ${parsed.message}`,
      "",
      "Stack Trace:",
      ...stackLines.map((line, i) => `${i + 1}. ${line}`),
      parsed.cause !== undefined ? `\nCause: ${toSafeJson(parsed.cause)}` : "",
      meta ? `\nMeta:\n${toSafeJson(meta)}` : "",
      "===============================================",
      "",
    ]
      .filter(Boolean)
      .join("\n");

    console.error(output);
  },

  info(message, meta) {
    const text = `[INFO] ${timestamp()} - ${message}${meta ? `\n${toSafeJson(meta)}` : ""}`;
    // if (isMcpStdioMode()) {
    //   console.error(text);
    //   return;
    // }
    console.log(text);
  },

  warn(message, meta) {
    const text = `[WARN] ${timestamp()} - ${message}${meta ? `\n${toSafeJson(meta)}` : ""}`;
    // if (isMcpStdioMode()) {
    //   console.error(text);
    //   return;
    // }
    console.warn(text);
  },
};
