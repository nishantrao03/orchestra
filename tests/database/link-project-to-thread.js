import linkProjectToThread from "../../tools/database/thread/link-project-to-thread.js";

async function testLinkProjectToThread() {
  try {
    const result =
      await linkProjectToThread({
        projectId:
          "08cafc23-9bab-4b0e-98c4-9c95ca1dd9e3",
        threadId:
          "T12345",
      });

    console.log(
      "Thread linked successfully:"
    );

    console.log(result);
  } catch (error) {
    console.error(
      "Test failed:"
    );

    console.error(error);
  }
}

testLinkProjectToThread();