import createCanvasForChannelWorkflow from "../workflows/create-canvas-for-channel.js";

async function testCreateCanvasForChannelWorkflow() {
    try {
        const result =
            await createCanvasForChannelWorkflow({
                projectId:
                    "d8bc342b-ec88-463a-ba8a-1603a6a855b4",

                channelId:
                    "C0B8PLY82LB",

                content: `
# Project Overview

This is a sample project canvas. Here is the addition.

## Resources

- Requirements Document
- Architecture Document
- API Documentation

## Notes

This canvas was generated for testing.
                `,
            });

        console.log(
            JSON.stringify(
                result,
                null,
                2
            )
        );
    } catch (error) {
        console.error(
            "[TEST CREATE CANVAS FOR CHANNEL] Failed",
            error
        );
    }
}

testCreateCanvasForChannelWorkflow();

// To run this test, use the command:
// node workflow-tests/create-canvas-for-channel.js