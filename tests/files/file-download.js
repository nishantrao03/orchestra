import buildUpdateText from "../../tools/files/file-download.js";

async function fileDownloadTest() {
    try {
        const files = [
            {
                "file-link": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B70300KRB/download/ai_applications_ethics_future.docx",
                "source": "slack",
                "document_type": "docx",
                "document_name": "ai_applications_ethics_future.docx"
            },
            {
                "file-link": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B71CDVBGW/download/evaluation_submission_handbook.pdf",
                "source": "slack",
                "document_type": "pdf",
                "document_name": "evaluation_submission_handbook.pdf"
            },
            {
                "file-link": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B6X3D9H9R/download/project_guidelines.pdf",
                "source": "slack",
                "document_type": "pdf",
                "document_name": "project_guidelines.pdf"
            },
            {
                "file-link": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B7XNZ12G0/download/ai_foundations_history.docx",
                "source": "slack",
                "document_type": "docx",
                "document_name": "ai_foundations_history.docx"
            },
            {
                "file-link": "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B773SHARJ/download/llm_overview_document.docx",
                "source": "slack",
                "document_type": "docx",
                "document_name": "llm_overview_document.docx"
            },
            {
                "file-link": "https://docs.google.com/document/d/1L-PqLk4sNhPYzs7qXXWcxEiq7IMK8QXm/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true",
                "source": "gdrive",
                "document_type": "docx",
                "document_name": "Global Warming.docx"
            },
            {
                "file-link": "https://docs.google.com/document/d/1267-wtEMKxwmElhkxMQ_G8w4FENYrHfO/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true",
                "source": "gdrive",
                "document_type": "docx",
                "document_name": "AI_Applications_Ethics_Future.docx"
            },
            {
                "file-link": "https://docs.google.com/spreadsheets/d/1UCDKHopujE3LUbdO9h6PGqBMiPwuwUrt/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true",
                "source": "gdrive",
                "document_type": "xlsx",
                "document_name": "Student_marks.xlsx"
            },
            {
                "file-link": "https://drive.google.com/file/d/1QEmmLcm6gz_YY99VwzTxjQfulb_tiHTw/view?usp=sharing",
                "source": "gdrive",
                "document_type": "pdf",
                "document_name": "Project_Guidelines.pdf"
            }

        ];


        const updateText = await buildUpdateText(files);
        console.log("Update text generated");
    } catch (error) {   
        console.error("Error during file download test:", error);
        process.exit(1);
    }
}

fileDownloadTest();

// To run this test, use the command: node tests/files/file-download.js

