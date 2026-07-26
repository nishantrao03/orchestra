import fs from "fs/promises";
import path from "path";

async function downloadGdriveFile(
  googleDriveUrl,
  tempFilePath
) {
  try {
    if (!googleDriveUrl) {
      throw new Error(
        "googleDriveUrl is required."
      );
    }

    if (!tempFilePath) {
      throw new Error(
        "tempFilePath is required."
      );
    }

    let fileId = null;

    const patterns = [
      /\/file\/d\/([^/]+)/,
      /\/document\/d\/([^/]+)/,
      /\/spreadsheets\/d\/([^/]+)/,
      /\/presentation\/d\/([^/]+)/
    ];

    for (const pattern of patterns) {
      const match =
        googleDriveUrl.match(pattern);

      if (match) {
        fileId = match[1];
        break;
      }
    }

    if (!fileId) {
      throw new Error(
        `Invalid Google Drive file URL ${googleDriveUrl}.`
      );
    }

    const downloadUrl =
      `https://drive.google.com/uc?export=download&id=${fileId}`;

    const response =
      await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(
        `Google Drive file download failed with status code ${response.status}`
      );
    }

    const contentDisposition =
      response.headers.get(
        "Content-Disposition"
      );

    if (!contentDisposition) {
      throw new Error(
        "Content-Disposition header not found."
      );
    }

    const filenameMatch =
      contentDisposition.match(
        /filename="([^"]+)"/
      );

    if (!filenameMatch) {
      throw new Error(
        "Unable to extract filename."
      );
    }

    const documentName =
      filenameMatch[1];

    const documentType =
      path.extname(
        documentName
      )
        .replace(".", "")
        .toLowerCase();

    const fileBuffer =
      Buffer.from(
        await response.arrayBuffer()
      );

    await fs.writeFile(
      tempFilePath,
      fileBuffer
    );

    return {
      temp_file_path: tempFilePath,
      document_name: documentName,
      document_type: documentType
    };
  } catch (error) {
    const err = new Error(
      `downloadGdriveFile failed: ${error && error.message ? error.message : String(error)}`
    );
    err.originalError = error;
    throw err;
  }
}

export default downloadGdriveFile;
