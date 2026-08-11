/**
 * Constructs the final message payload for the LLM by combining the system prompt,
 * conversation history, and the current user prompt.
 *
 * @param {string} systemPrompt - The system instructions for the LLM.
 * @param {string} userPrompt - The latest user input to be processed.
 * @param {Array<{role: string, content: string}>} messages - The existing conversation history.
 * @returns {Array<{role: string, content: string}>} The complete message payload array.
 */
export default function buildMessagePayload(systemPrompt, userPrompt, messages = []) {
    return [
        {
            role: "system",
            content: systemPrompt
        },
        ...messages,
        {
            role: "user",
            content: userPrompt
        }
    ];
}

// /**
//  * Executes an independent test for the buildMessagePayload function.
//  */
// function testBuildMessagePayload() {
//     console.log("Running buildMessagePayload independent test...");

//     const mockSystemPrompt = "You are a helpful assistant.";
//     const mockUserPrompt = "Please help me plan my day.";
//     const mockMessages = [
//         {
//             role: 'user',
//             content: '{"text":"<@U0ABMA4B963> Hello","user":"U0AC0M1S90W","thread_ts":"1786407560.977439"}'
//         },
//         {
//             role: 'assistant',
//             content: '{"text":"Hello! How can I help you today? Would you like to work on an existing project or create a new one?","user":"U0ABMA4B963","thread_ts":"1786407560.977439"}'
//         },
//         {
//             role: 'user',
//             content: '{"text":"Hello, what should I do today?","user":"U0AC0M1S90W","thread_ts":"1786407560.977439"}'
//         },
//         {
//             role: 'user',
//             content: '{"text":"<@U0ABMA4B963>","user":"U0AC0M1S90W","thread_ts":"1786407560.977439"}'
//         },
//         {
//             role: 'assistant',
//             content: '{"text":"{\\"text\\":\\"I can help you with that. Which project would you like to work on? \\\\n- Test Project 2\\\\n- AI Project\\",\\"user\\":\\"U0ABMA4B963\\",\\"thread_ts\\":\\"1786407560.977439\\"}","user":"U0ABMA4B963","thread_ts":"1786407560.977439"}'
//         }
//     ];

//     try {
//         const payload = buildMessagePayload(mockSystemPrompt, mockUserPrompt, mockMessages);
        
//         console.log("\nTest successful. Formatted Message Payload:");
//         console.dir(payload, { depth: null });
//     } catch (error) {
//         console.error("\nTest encountered an error:", error);
//     }
// }

// testBuildMessagePayload();