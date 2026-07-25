import ingestDocumentsWorkflow from "../workflows/ingest-documents.js";

async function main() {
    try {
        const result =
            await ingestDocumentsWorkflow({
    projectId:
        "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",

    slackMemberId:
        "U0AC0M1S90W",

    fileUrls: [
        {
            fileUrl: "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B9P4S04P8/download/ai_applications_ethics_future.docx",
            is_private: true
        },
        {
            fileUrl: "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B99NFLPDM/download/evaluation_submission_handbook.pdf",
            is_private: false
        },
        {
            fileUrl: "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B9R6URVMG/download/project_guidelines.pdf",
            is_private: true
        },
        {
            fileUrl: "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B9P4TTVHU/download/ai_foundations_history.docx",
            is_private: false
        },
        {
            fileUrl: "https://docs.google.com/spreadsheets/d/1UCDKHopujE3LUbdO9h6PGqBMiPwuwUrt/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true",
            is_private: true
        },
        {
            fileUrl: "https://docs.google.com/document/d/1L-PqLk4sNhPYzs7qXXWcxEiq7IMK8QXm/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true",
            is_private: false
        },
        {
            fileUrl: "https://drive.google.com/file/d/1QEmmLcm6gz_YY99VwzTxjQfulb_tiHTw/view?usp=sharing",
            is_private: true
        }
    ],

    textContent: "The project follows a manager approval workflow for all production deployments. Code reviews are mandatory before merging into the main branch. Slack channels should be used for project communication, and major architectural decisions must be documented and shared with all project members.",
    
    isTextContentPrivate: false
});

        console.log(
            JSON.stringify(
                result,
                null,
                4
            )
        );
    } catch (error) {
        console.error(
            "[INGEST DOCUMENTS TEST] Failed",
            error
        );
    }
}

main();