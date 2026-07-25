import dotenv from "dotenv";
import retrieveChunks from "../../tools/api-call/retrieve-chunks.js";

dotenv.config();

async function retrieveChunksTest() {
  try {
    const query = "What is the last date to finish the project?";
    const project_id = "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3";
    const apply_privacy_filter = true;

    const result = await retrieveChunks(query, project_id, apply_privacy_filter);
    console.log("Retrieve Chunks Result:", result);

    // Print the chunks here one by one for better readability
    // This is the format
    // chunks: 
//     {
//     base_chunks: [ [Object], [Object], [Object], [Object], [Object] ],
//     update_chunks: [ [Object], [Object], [Object], [Object], [Object] ]
//   }
    console.log("Base Chunks:");
    result.chunks.base_chunks.forEach((chunk, index) => {
      console.log(`Chunk ${index + 1}:`, chunk);
    });
    console.log("Update Chunks:");
    result.chunks.update_chunks.forEach((chunk, index) => {
      console.log(`Chunk ${index + 1}:`, chunk);
    });
    // console.log("FAQ Chunks:");
    // result.chunks.faq_chunks.forEach((chunk, index) => {
    //   console.log(`Chunk ${index + 1}:`, chunk);
    // });

  } catch (error) {
    console.error("Error retrieving chunks:", error);
    process.exit(1);
  }
}

retrieveChunksTest();

// To run this test, use the command: node tests/api/retrieve-chunks.js