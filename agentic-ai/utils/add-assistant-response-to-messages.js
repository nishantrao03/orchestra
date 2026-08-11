/**
 * Appends the assistant's final response to the end of the message history.
 *
 * @param {Array<{role: string, content: string}>} messages - The existing conversation history.
 * @param {string} finalResponse - The text content of the assistant's response.
 * @returns {Array<{role: string, content: string}>} The updated message array.
 */
export default function addAssistantResponseToMessages(messages = [], finalResponse) {
    return [
        ...messages,
        {
            role: "assistant",
            content: finalResponse
        }
    ];
}

// /**
//  * Executes an independent test for the appendAssistantResponse function.
//  */
// function testAppendAssistantResponse() {
//     console.log("Running appendAssistantResponse independent test...");

//     const mockMessages = [
//         {
//             role: "system",
//             content: "You are a helpful assistant."
//         },
//         {
//             role: "user",
//             content: "Can you help me with a task?"
//         }
//     ];
    
//     const mockFinalResponse = "Of course! What do you need help with?";

//     try {
//         const updatedMessages = addAssistantResponseToMessages(mockMessages, mockFinalResponse);
        
//         console.log("\nTest successful. Updated Message Payload:");
//         console.dir(updatedMessages, { depth: null });
//     } catch (error) {
//         console.error("\nTest encountered an error:", error);
//     }
// }

// testAppendAssistantResponse();