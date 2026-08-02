import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

import downloadGdriveFile from "./gdrive-download-helper.js";

const TEMP_UPLOADS_DIR = path.join(
  process.cwd(),
  "temp-uploads"
);

async function downloadGdriveFileTool(
  googleDriveUrl
) {
  try {
    if (!googleDriveUrl) {
      throw new Error(
        "googleDriveUrl is required."
      );
    }

    await fs.mkdir(
      TEMP_UPLOADS_DIR,
      {
        recursive: true,
      }
    );

    const tempFilePath = path.join(
      TEMP_UPLOADS_DIR,
      `gdrive-${crypto.randomUUID()}`
    );

    return await downloadGdriveFile(
      googleDriveUrl,
      tempFilePath
    );
  } catch (error) {
    const err = new Error(
      `downloadGdriveFileTool failed: ${
        error && error.message
          ? error.message
          : String(error)
      }`
    );
    err.originalError = error;
    throw err;
  }
}

export default downloadGdriveFileTool;