import ingestUpdatesWorkflow from "../workflows/ingest-updates.js";

async function main() {
    try {
        const result =
            await ingestUpdatesWorkflow({
                projectId:
                    "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",

                public: {
                    text:
                        "",

                    files: [
                        "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B70300KRB/download/ai_applications_ethics_future.docx",
                        "https://files.slack.com/files-pri/T0ABZA0JHHT-F0B71CDVBGW/download/evaluation_submission_handbook.pdf",
                    ],
                },

                private: {
                    text:
                        "",

                    files: [
                        "https://docs.google.com/document/d/1L-PqLk4sNhPYzs7qXXWcxEiq7IMK8QXm/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true",
                        "https://docs.google.com/document/d/1267-wtEMKxwmElhkxMQ_G8w4FENYrHfO/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true",
                    ],
                },
            });

        console.log(result);

        console.log(
            JSON.stringify(
                result,
                null,
                4
            )
        );
    } catch (error) {
        console.error(
            "[INGEST UPDATES TEST] Failed",
            error
        );
    }
}

main();
