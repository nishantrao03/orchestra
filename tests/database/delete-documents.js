// tests/database/delete-documents.js

// This is a test function for tools/database/document/delete-documents.js.
import deleteDocuments from "../../tools/database/document/delete-documents.js";

async function testDeleteDocuments() {
  console.log("Running deleteDocuments test...");

  // Replace these UUIDs with actual document IDs present in your test database
  const testDocumentIds = [
    "e4a4a9df-e215-44b9-a1fe-6e017341cb79",
    "03a6c359-0bd4-4265-99f3-f99a539f2a0f"
  ];

  try {
    const deletedDocumentIds = await deleteDocuments(testDocumentIds);
    console.log("Deleted Document IDs:", deletedDocumentIds);
  } catch (error) {
    console.error("Error occurred while deleting documents:", error);
  }
}

testDeleteDocuments();
// To run this test, use the command: node tests/database/delete-documents.js