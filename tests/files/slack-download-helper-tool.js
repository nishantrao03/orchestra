import downloadSlackFileTool from "../../tools/files/download-helpers/slack-download-helper-tool.js";

const testSlackUrl = "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B71CDVBGW/download/evaluation_submission_handbook.pdf";

function testDownloadSlackFileTool() {
  downloadSlackFileTool(testSlackUrl)
    .then((tempFilePath) => {
      console.log("Downloaded file path:", tempFilePath);
    })
    .catch((error) => {
      console.error("Error downloading Slack file:", error);
    });
}

testDownloadSlackFileTool();