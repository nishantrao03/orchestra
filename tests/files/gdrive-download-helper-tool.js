import downloadGdriveFileTool from "../../tools/files/download-helpers/gdrive-download-helper-tool.js";

// Test the function with a sample Google Drive URL
const testGdriveUrl = "https://drive.google.com/file/d/1QEmmLcm6gz_YY99VwzTxjQfulb_tiHTw/view?usp=sharing"; // Replace FILE_ID with an actual file ID for testing

function testDownloadGdriveFileTool() {
  downloadGdriveFileTool(testGdriveUrl)
    .then((tempFilePath) => {
      console.log("Downloaded file path:", tempFilePath);
    })
    .catch((error) => {
      console.error("Error downloading Google Drive file:", error);
    });
}  

testDownloadGdriveFileTool();