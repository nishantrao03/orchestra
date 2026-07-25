// This is a test for tools/database/fetch-document.js.

// import prisma from "../../../services/db/prisma-client.js";

// async function fetchDocuments(documentIds) {
//     const documents = await prisma.document.findMany({
//         where: {
//             document_id: {
//                 in: documentIds,
//             },
//         },
//     });
//     return documents;
// }

// export default fetchDocuments;

// This is the tool that needs to be tested.

// Don't call unnecessary tools in this test. Only call the tool that is being tested, which is fetchDocuments.

import fetchDocuments from "../../tools/database/document/fetch-documents.js";

async function testFetchDocuments() {
    // Replace these with actual document IDs from your test database
    const documentIds = [
        "cb39a9a6-210b-41a7-9804-96d39ad56f67",
        "ee8aacf2-bf4a-4b24-9528-e389ee380a82"    ];
    const documents = await fetchDocuments(documentIds);
    console.log(documents);
}

testFetchDocuments();

// To run this test, use the command: node tests/database/fetch-document.js