// import dotenv from "dotenv";
// import callGemini from "../ai/gemini-helpers/gemini-call-helper.js";
// import postMessageInThread from "../tools/slack/post-message-in-thread.js";
// import buildMessages from "./events/messages-builder.js";
// import securityHandler from "./events/security-handler.js";
// import executeTools from "../ai/tool-execution/execute-tools.js";
// import addToolResultsToMessages from "../ai/tool-execution/add-tool-results-to-messages.js";
// import securityAgentTools from "../ai/tool-documentation/security-tool-documentation.js";
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

//       console.log(
//         geminiResponse
//       );

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

//       const choice =
//         geminiResponse
//           .choices[0];

//       const assistantMessage =
//         choice.message;

//       const finishReason =
//         choice.finish_reason;

//       if (
//         finishReason ===
//         "stop"
//       ) {
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

//       if (
//         finishReason !==
//         "tool_calls"
//       ) {
//         throw new Error(
//           `Unsupported finish reason: ${finishReason}`
//         );
//       }

//       console.log("Assistant Message");
//       console.log(assistantMessage);

//       const toolCalls =
//         assistantMessage
//           .tool_calls;

//       console.log(toolCalls);

//       if (
//         !Array.isArray(
//           toolCalls
//         ) ||
//         toolCalls.length ===
//           0
//       ) {
//         throw new Error(
//           "Gemini requested tool execution but no tool calls were returned."
//         );
//       }

//       const toolResults =
//         await executeTools(
//           toolCalls
//         );

//         console.log("Messages before");
//       console.log(messages);

//       addToolResultsToMessages(
//         messages,
//         assistantMessage,
//         toolResults
//       );
//       console.log("Messages after");
//       console.log(messages);

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
import path from "path";
import { fileURLToPath } from "url";
import runAgenticAI from "../agentic-ai/index.js";
import postMessageInThread from "../tools/slack/post-message-in-thread.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});

/**
 * Intercepts Slack mentions or direct messages, extracts relevant event parameters, 
 * passes them to the central agentic AI graph, and posts the resulting response back to Slack.
 *
 * @param {Object} args - The event arguments provided by the Slack Bolt framework.
 * @param {Object} args.event - The underlying Slack event payload.
 */
export default async function handleAppMention({ event }) {
    try {
        if (!event.user || event.user === process.env.SLACK_BOT_USER_ID) {
            return;
        }

        const threadTs = event.thread_ts ?? event.ts;
        const channelId = event.channel;
        const userId = event.user;
        const userMessage = event.text;

        const finalResponse = await runAgenticAI({
            userMessage: userMessage,
            channelId: channelId,
            threadId: threadTs,
            userId: userId,
        });

        await postMessageInThread({
            channel: channelId,
            threadTs: threadTs,
            text: finalResponse,
        });
    } catch (error) {
        const err = new Error(
            `handleAppMention failed: ${error && error.message ? error.message : String(error)}`
        );

        err.originalError = error;

        console.error(err);
    }
}