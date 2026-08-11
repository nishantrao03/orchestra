import getThreadReplies from "../../tools/slack/thread-replies.js";

import dotenv from "dotenv";

dotenv.config();

/**
 * Fetches conversation messages for a specific thread and formats them into JSON objects for the LLM.
 * Includes text, user identifiers, thread timestamps, and optional file metadata.
 * Determines if the message role is user or assistant based on the bot's user ID.
 *
 * @param {string} channelId - The identifier for the Slack channel.
 * @param {string} threadId - The identifier for the conversation thread.
 * @returns {Promise<Array<{role: string, content: string}>>} Array of formatted message objects.
 */
export default async function buildMessageHistory(channelId, threadId) {
    if (!channelId || !threadId) {
        return [];
    }

    try {

        const rawMessages = await getThreadReplies({
            channel: channelId,
            threadTs: threadId
        });

        if (!Array.isArray(rawMessages)) {
            return [];
        }

        return rawMessages
            .filter((msg) => msg.text && msg.user)
            .map((msg) => {
                const content = {
                    text: msg.text,
                    user: msg.user,
                    thread_ts: msg.thread_ts
                };

                if (Array.isArray(msg.files) && msg.files.length > 0) {
                    content.files = msg.files.map((file) => ({
                        filetype: file.filetype,
                        size: file.size,
                        url_private_download: file.url_private_download,
                        permalink_public: file.permalink_public
                    }));
                }

                return {
                    role: msg.user === process.env.SLACK_BOT_USER_ID ? "assistant" : "user",
                    content: JSON.stringify(content)
                };
            });
    } catch (error) {
        console.error(`[MESSAGE HISTORY BUILDER] Failed to fetch or format messages for thread ${threadId}:`, error);
        
        return [];
    }
}

// /**
//  * Executes an independent test for the buildMessageHistory function.
//  */
// async function testBuildMessageHistory() {
//     console.log("Running buildMessageHistory independent test...");

//     // if (!process.env.SLACK_BOT_USER_ID) {
//     //     process.env.SLACK_BOT_USER_ID = "U_MOCK_BOT_ID";
//     // }

//     const mockChannelId = "C0AC2NQ4FBL";
//     // const mockThreadId = "1786406255.321029";
//     const mockThreadId = "1786407560.977439";

//     try {
//         const result = await buildMessageHistory(mockChannelId, mockThreadId);
        
//         console.log("\nTest successful. Formatted Message History Output:");
//         console.dir(result, { depth: null });
//     } catch (error) {
//         console.error("\nTest encountered an error:", error);
//     }
// }

// testBuildMessageHistory();