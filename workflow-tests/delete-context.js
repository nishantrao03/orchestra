import deleteContextWorkflow from "../workflows/delete-context.js";

async function main() {
    const result =
        await deleteContextWorkflow({
            projectId:
                "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",

            documentIds: [
                "21a15c21-828c-4d72-80ae-26a7f8d9e4a5",
                "e7641e24-9972-4dba-b9e2-abbe9c222a81",
                "cb39a9a6-210b-41a7-9804-96d39ad56f67"
            ],
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