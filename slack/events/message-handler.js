// import dotenv from "dotenv";
// import callGemini from "../../ai/gemini_helpers/gemini-call-helper.js";
// import postMessageInThread from "../../tools/slack/post-message-in-thread.js";
// import buildMessages from "./messages-builder.js";
// import securityHandler from "./security-handler.js";
// import executeTools from "../../ai/tool-execution/execute-tools.js";
// import addToolResultsToMessages from "../../ai/tool-execution/add-tool-results-to-messages.js";
// import securityAgentTools from "../../ai/tool-documentation/security-tool-documentation.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename =
//   fileURLToPath(
//     import.meta.url
//   );

// const __dirname =
//   path.dirname(
//     __filename
//   );

// const MAX_TOOL_ITERATIONS =
//   20;

// dotenv.config({
//   path: path.resolve(
//     __dirname,
//     "../../.env"
//   ),
// });

// export default async function handleAppMention({
//   event,
// }) {
//   try {
//     if (
//       !event.user ||
//       event.user ===
//         process.env
//           .SLACK_BOT_USER_ID
//     ) {
//       return;
//     }

//     const threadTs =
//       event.thread_ts ??
//       event.ts;

//     // const securityContext =
//     //   await securityHandler({
//     //     userId: event.user,
//     //     channelId:
//     //       event.channel,
//     //     threadId:
//     //       event.thread_ts ??
//     //       null,
//     //   });

//     const messages =
//       await buildMessages({
//         event,
//       });

//     let iteration =
//       0;

//     while (
//       iteration <
//       MAX_TOOL_ITERATIONS
//     ) {
//       const geminiResponse =
//         await callGemini(
//           messages,
//           securityAgentTools
//         );
//         console.log(geminiResponse);

//       if (
//         !geminiResponse ||
//         !geminiResponse.choices ||
//         geminiResponse
//           .choices
//           .length === 0
//       ) {
//         throw new Error(
//           "Invalid response from Gemini"
//         );
//       }

//       const assistantMessage =
//         geminiResponse
//           .choices[0]
//           .message;

//       const toolCalls =
//         assistantMessage
//           .tool_calls;

//       if (!toolCalls) {
//         const replyText =
//           assistantMessage
//             .content;

//         await postMessageInThread({
//           channel:
//             event.channel,
//           threadTs,
//           text:
//             replyText,
//         });

//         return;
//       }

//       const toolResults =
//         await executeTools(
//           toolCalls
//         );

//       addToolResultsToMessages(
//         messages,
//         assistantMessage,
//         toolResults
//       );

//       iteration++;
//     }

//     throw new Error(
//       `Maximum tool iterations exceeded (${MAX_TOOL_ITERATIONS}).`
//     );
//   } catch (error) {
//     const err =
//       new Error(
//         `handleAppMention failed: ${
//           error &&
//           error.message
//             ? error.message
//             : String(error)
//         }`
//       );

//     err.originalError =
//       error;

//     throw err;
//   }
// }

import dotenv from "dotenv";
import callGemini from "../../ai/gemini-helpers/gemini-call-helper.js";
import postMessageInThread from "../../tools/slack/post-message-in-thread.js";
import buildMessages from "./messages-builder.js";
import securityHandler from "./security-handler.js";
import executeTools from "../../ai/tool-execution/execute-tools.js";
import addToolResultsToMessages from "../../ai/tool-execution/add-tool-results-to-messages.js";
import securityAgentTools from "../../ai/tool-documentation/security-tool-documentation.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename =
  fileURLToPath(
    import.meta.url
  );

const __dirname =
  path.dirname(
    __filename
  );

const MAX_TOOL_ITERATIONS =
  20;

dotenv.config({
  path: path.resolve(
    __dirname,
    "../../.env"
  ),
});

export default async function handleAppMention({
  event,
}) {
  try {
    if (
      !event.user ||
      event.user ===
        process.env
          .SLACK_BOT_USER_ID
    ) {
      return;
    }

    const threadTs =
      event.thread_ts ??
      event.ts;

    // const securityContext =
    //   await securityHandler({
    //     userId: event.user,
    //     channelId:
    //       event.channel,
    //     threadId:
    //       event.thread_ts ??
    //       null,
    //   });

    const messages =
      await buildMessages({
        event,
      });

    let iteration =
      0;

    while (
      iteration <
      MAX_TOOL_ITERATIONS
    ) {
      const geminiResponse =
        await callGemini(
          messages,
          securityAgentTools
        );

      console.log(
        geminiResponse
      );

      if (
        !geminiResponse ||
        !geminiResponse.choices ||
        geminiResponse
          .choices
          .length === 0
      ) {
        throw new Error(
          "Invalid response from Gemini"
        );
      }

      const choice =
        geminiResponse
          .choices[0];

      const assistantMessage =
        choice.message;

      const finishReason =
        choice.finish_reason;

      if (
        finishReason ===
        "stop"
      ) {
        const replyText =
          assistantMessage
            .content;

        await postMessageInThread({
          channel:
            event.channel,
          threadTs,
          text:
            replyText,
        });

        return;
      }

      if (
        finishReason !==
        "tool_calls"
      ) {
        throw new Error(
          `Unsupported finish reason: ${finishReason}`
        );
      }

      const toolCalls =
        assistantMessage
          .tool_calls;

      console.log(toolCalls);

      if (
        !Array.isArray(
          toolCalls
        ) ||
        toolCalls.length ===
          0
      ) {
        throw new Error(
          "Gemini requested tool execution but no tool calls were returned."
        );
      }

      const toolResults =
        await executeTools(
          toolCalls
        );

      addToolResultsToMessages(
        messages,
        assistantMessage,
        toolResults
      );

      iteration++;
    }

    throw new Error(
      `Maximum tool iterations exceeded (${MAX_TOOL_ITERATIONS}).`
    );
  } catch (error) {
    const err =
      new Error(
        `handleAppMention failed: ${
          error &&
          error.message
            ? error.message
            : String(error)
        }`
      );

    err.originalError =
      error;

    throw err;
  }
}