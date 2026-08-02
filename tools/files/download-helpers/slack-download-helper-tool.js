import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

import downloadSlackFile from "./slack-download-helper.js";

const TEMP_UPLOADS_DIR = path.join(
  process.cwd(),
  "temp-uploads"
);

async function downloadSlackFileTool(
  fileUrl
) {
  try {
    if (!fileUrl) {
      throw new Error(
        "fileUrl is required."
      );
    }

    await fs.mkdir(
      TEMP_UPLOADS_DIR,
      {
        recursive: true,
      }
    );

    const parsedUrl = new URL(fileUrl);
const extension = path.extname(parsedUrl.pathname);

const tempFilePath = path.join(
  TEMP_UPLOADS_DIR,
  `slack-${crypto.randomUUID()}${extension}`
);

    return await downloadSlackFile(
      fileUrl,
      tempFilePath
    );
  } catch (error) {
    const err = new Error(
      `downloadSlackFileTool failed: ${
        error && error.message
          ? error.message
          : String(error)
      }`
    );
    err.originalError = error;
    throw err;
  }
}

export default downloadSlackFileTool;