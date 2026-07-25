import deleteContextEndpoint from "../../tools/api-call/context-deletion.js";

console.log(deleteContextEndpoint);

async function testDeleteContext() {
    const deleteOperation = {
        "project_id": "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
        "metadata_filter": {
            "layer": "base_layer",
            "document_id": "doc_004"
        }
    };

    try {
        const deletionResult = await deleteContextEndpoint(deleteOperation);
        console.log("Context Deletion Result:", deletionResult);
    } catch (error) {
        console.error("Error during context deletion:", error);
    }
}

testDeleteContext();

// To run this test in terminal, use the command: node tests/api/context-deletion.js