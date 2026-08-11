/**
 * Appends a user prompt to the end of the message history.
 *
 * @param {Array<{role: string, content: string}>} messages - The existing conversation history.
 * @param {string} userPrompt - The text content of the user's input.
 * @returns {Array<{role: string, content: string}>} The updated message array.
 */
export default function addUserPromptToMessages(messages = [], userPrompt) {
    return [
        ...messages,
        {
            role: "user",
            content: userPrompt
        }
    ];
}

// /**
//  * Executes an independent test for the addUserPromptToMessages function.
//  */
// function testAddUserPromptToMessages() {
//     console.log("Running addUserPromptToMessages independent test...");

//     const mockMessages = [
//         {
//             role: "system",
//             content: "You are a helpful assistant."
//         },
//         {
//             role: "assistant",
//             content: "Hello! How can I assist you today?"
//         }
//     ];
    
//     const mockUserPrompt = "I need help understanding LangGraph routing.";

//     try {
//         const updatedMessages = addUserPromptToMessages(mockMessages, mockUserPrompt);
        
//         console.log("\nTest successful. Updated Message Payload:");
//         console.dir(updatedMessages, { depth: null });
//     } catch (error) {
//         console.error("\nTest encountered an error:", error);
//     }
// }

// testAddUserPromptToMessages();