import fetchDocumentsForProject from "../../tools/database/document/fetch-documents-for-project.js";

async function main() {
    const documents =
        await fetchDocumentsForProject(
            "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3"
        );

    console.log(
        JSON.stringify(
            documents,
            null,
            4
        )
    );
}

main();