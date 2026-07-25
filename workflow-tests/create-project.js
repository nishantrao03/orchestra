import createProjectWorkflow from "../workflows/create-project.js";

async function testCreateProjectWorkflow() {
  try {
    const result =
      await createProjectWorkflow({
        userId:
          "U1234",
        projectName:
          "Test Project",
        threadId:
          "1234567890.123456",
      });

    console.log(
      "Workflow completed successfully:"
    );

    console.log(
      JSON.stringify(
        result,
        null,
        2
      )
    );
  } catch (error) {
    console.error(
      "Test failed:"
    );

    console.error(error);
  }
}

testCreateProjectWorkflow();