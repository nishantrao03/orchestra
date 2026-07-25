import faqIngestion from "../../tools/api-call/faq-ingestion.js";

async function main() {
    const result =
        await faqIngestion(
            [
                {
                    question:
                        "How do we deploy to production?",

                    answer:
                        "Production deployments require manager approval and code review."
                },

                {
                    question:
                        "Who can add project members?",

                    answer:
                        "Only project managers can add or remove project members."
                },

                {
                    question:
                        "Are code reviews mandatory?",

                    answer:
                        "Yes, code reviews are required before merging changes into the main branch."
                },
                {
                    question:
                        "When is the deadline for the project?",

                    answer:
                        "Deadline is July 31, 2026."
                }
            ],

            "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3"
        );

    console.log(
        JSON.stringify(
            result,
            null,
            4
        )
    );
}

main();