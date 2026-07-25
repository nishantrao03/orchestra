import publicRetrievalWorkflow from "../workflows/private-retrieval.js";

async function main() {
    const result =
        await publicRetrievalWorkflow({
            query:
                "What is the last date to finish the project?",
            projectId:
                "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
        });

    console.log(
        JSON.stringify(
            result,
            null,
            4
        )
    );
}

main();