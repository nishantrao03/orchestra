import fetchCanvasForChannel from "../../tools/database/channel/fetch-canvas-for-channel.js";

async function runTest() {
  try {
    const result = await fetchCanvasForChannel({
      channelIds: [
        "C0B1EGX7KCL",
        "C0B1AV4BLKU",
      ],
    });

    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}

runTest();

// To run this test, use the command: node tests/database/fetch-canvas-for-channel.js