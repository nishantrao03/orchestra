// This is a test for tools/api_call/ingest-documents.js.
import ingestDocuments from "../../tools/api-call/ingest-documents.js";

async function testIngestDocuments() {
  console.log("Running ingestDocuments test...");
  const testFilesMetadata = [
//   {
//     "download_url": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B70300KRB/download/ai_applications_ethics_future.docx",
//     "source": "slack",
//     "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
//     "document_id": "doc_001",
//     "document_type": "docx",
//     "document_name": "ai_applications_ethics_future.docx"
//   },
//   {
//     "download_url": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B71CDVBGW/download/evaluation_submission_handbook.pdf",
//     "source": "slack",
//     "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
//     "document_id": "doc_002",
//     "document_type": "pdf",
//     "document_name": "evaluation_submission_handbook.pdf"
//   },
//   {
//     "download_url": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B6X3D9H9R/download/project_guidelines.pdf",
//     "source": "slack",
//     "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
//     "document_id": "doc_003",
//     "document_type": "pdf",
//     "document_name": "project_guidelines.pdf"
//   },
//   {
//     "download_url": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B7XNZ12G0/download/ai_foundations_history.docx",
//     "source": "slack",
//     "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
//     "document_id": "doc_004",
//     "document_type": "docx",
//     "document_name": "ai_foundations_history.docx"
//   },
//   {
//     "download_url": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B773SHARJ/download/llm_overview_document.docx",
//     "source": "slack",
//     "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
//     "document_id": "doc_005",
//     "document_type": "docx",
//     "document_name": "llm_overview_document.docx"
//   },
  
  {
    "download_url": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B9P4S04P8/download/ai_applications_ethics_future.docx",
    "source": "slack",
    "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
    "document_id": "doc_001",
    "document_type": "docx",
    "document_name": "AI_Applications_Ethics_Future.docx"
  },
  {
    "download_url": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B99NFLPDM/download/evaluation_submission_handbook.pdf",
    "source": "slack",
    "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
    "document_id": "doc_002",
    "document_type": "pdf",
    "document_name": "Evaluation_Submission_Handbook.pdf"
  },
  {
    "download_url": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B9R6URVMG/download/project_guidelines.pdf",
    "source": "slack",
    "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
    "document_id": "doc_003",
    "document_type": "pdf",
    "document_name": "Project_Guidelines.pdf"
  },
  {
    "download_url": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B9P4TTVHU/download/ai_foundations_history.docx",
    "source": "slack",
    "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
    "document_id": "doc_004",
    "document_type": "docx",
    "document_name": "AI_Foundations_History.docx"
  },
  {
    "download_url": "https://docs.google.com/spreadsheets/d/1UCDKHopujE3LUbdO9h6PGqBMiPwuwUrt/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true",
    "source": "google_drive",
    "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
    "document_id": "doc_005",
    "document_type": null,
    "document_name": null
  },
  {
    "download_url": "https://docs.google.com/document/d/1L-PqLk4sNhPYzs7qXXWcxEiq7IMK8QXm/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true",
    "source": "google_drive",
    "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
    "document_id": "doc_006",
    "document_type": null,
    "document_name": null
  },
  {
    "download_url": "https://drive.google.com/file/d/1QEmmLcm6gz_YY99VwzTxjQfulb_tiHTw/view?usp=sharing",
    "source": "google_drive",
    "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
    "document_id": "doc_007",
    "document_type": null,
    "document_name": null
  }

];

  try {
    const result = await ingestDocuments(testFilesMetadata);
    console.log("Ingested Documents:", result);
  } catch (error) {
    console.error("Error occurred while ingesting documents:", error);
  }
}

testIngestDocuments();
// To run this test, use the command: node tests/api/ingest-documents.js