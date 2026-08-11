import callGemini from '../../ai/gemini-helpers/gemini-call-helper.js';
import addAssistantResponseToMessages from './add-assistant-response-to-messages.js';
import addToolResultsToMessages from './add-tool-results-to-messages.js';
import addUserPromptToMessages from './add-user-prompt-to-messages.js';
import buildMessagePayload from './prompt-builder.js';
import executeTools from '../../tools-implementation/execution/execute-tools.js';
import workflowTools from '../../tools-implementation/documentation/workflow-tools-documentation.js';

/**
 * Orchestrates LLM execution, managing state updates and iterative tool execution up to a maximum limit.
 * 
 * @param {string} systemPrompt 
 * @param {string} userPrompt 
 * @param {Array<Object>|null} tools 
 * @param {Object|null} responseFormat 
 * @param {Array<Object>} messages 
 * @returns {Promise<Object>} 
 */
export default async function executeLlm(systemPrompt, userPrompt, tools = null, responseFormat = null, messages = []) {
    try {
        console.log("[LLM EXECUTION] Initializing execution step.");

        let stateMessages = addUserPromptToMessages(messages, userPrompt);
        let finalResponse = null;

        const MAX_ITERATIONS = 5;
        let iteration = 0;

        while (iteration < MAX_ITERATIONS) {
            console.log(`[LLM EXECUTION] Requesting completion from Gemini API. Iteration: ${iteration + 1}`);
            
            const llmPayload = [
                { role: "system", content: systemPrompt },
                ...stateMessages
            ];

            const geminiResponse = await callGemini(llmPayload, tools, false, responseFormat);

            if (!geminiResponse || !geminiResponse.choices || geminiResponse.choices.length === 0) {
                throw new Error("Invalid or empty response received from Gemini API.");
            }

            const choice = geminiResponse.choices[0];
            const assistantMessage = choice.message;
            const finishReason = choice.finish_reason;

            if (finishReason === "tool_calls") {
                console.log("[LLM EXECUTION] Finish reason 'tool_calls' detected. Executing requested tools.");
                
                const toolCalls = assistantMessage.tool_calls;

                if (!Array.isArray(toolCalls) || toolCalls.length === 0) {
                    throw new Error("Gemini requested tool execution but no tool calls were returned.");
                }

                const toolResults = await executeTools(toolCalls);
                
                stateMessages = addToolResultsToMessages(stateMessages, assistantMessage, toolResults);
                
                console.log("[LLM EXECUTION] Tool execution complete. Results appended to state.");
                
            } else if (finishReason === "stop") {
                console.log("[LLM EXECUTION] Finish reason 'stop' detected. Formatting final response.");
                
                finalResponse = assistantMessage.content;
                stateMessages = addAssistantResponseToMessages(stateMessages, finalResponse);
                break; 
                
            } else {
                throw new Error(`Unsupported finish reason: ${finishReason}`);
            }

            iteration++;
        }

        if (iteration === MAX_ITERATIONS && !finalResponse) {
            throw new Error(`Maximum tool iterations exceeded (${MAX_ITERATIONS}).`);
        }

        console.log("[LLM EXECUTION] Execution step completed successfully.");
        
        return {
            success: true,
            messages: stateMessages,
            finalResponse: finalResponse
        };

    } catch (error) {
        console.error("[LLM EXECUTION] Execution encountered a critical failure:");
        console.error("[LLM EXECUTION] Type:", error.constructor.name);
        console.error("[LLM EXECUTION] Message:", error.message);

        return {
            success: false,
            messages: messages,
            finalResponse: null,
            error: error.message
        };
    }
}

// /**
//  * Executes an independent test for the executeLlm function to validate tool execution flow.
//  */
// async function testExecuteLlm() {
//     console.log("Running executeLlm independent test...");

//     const mockSystemPrompt = "You are an intelligent file management and workflow assistant responsible for executing user requests accurately. Your primary objective is to evaluate the user's intent, identify the necessary project and user identifiers, and invoke the appropriate tools to complete the task. You must handle all provided URLs and metadata with strict precision, ensuring that access levels are properly configured according to the user's instructions. Do not make assumptions about missing data; rely solely on the provided tool schemas. Upon successful execution, summarize the actions taken clearly for the user.";
    
//     const mockUserPrompt = "For the project with id '5e11abfa-ba68-4ea7-8add-242011c9497b', the user with id 'U0AC0M1S90W' wants to store the following file 'https://docs.google.com/document/d/1L-PqLk4sNhPYzs7qXXWcxEiq7IMK8QXm/edit?usp=sharing&ouid=116006106231977998356&rtpof=true&sd=true'. This is a private file, it must have restricted access. Please execute this for the user.";

//     const mockMessages = [
//         {
//             role: "user",
//             content: "Hi, can you help me manage some project files today?"
//         },
//         {
//             role: "assistant",
//             content: "Hello! I certainly can. Please provide the details of the project and the specific files you need to manage or store."
//         }
//     ];

//     try {
//         const result = await executeLlm(
//             mockSystemPrompt, 
//             mockUserPrompt, 
//             workflowTools, 
//             null, 
//             mockMessages
//         );
        
//         console.log("\nTest execution finished. Resulting Payload:");
//         console.dir(result, { depth: null });
//     } catch (error) {
//         console.error("\nTest encountered an error:", error);
//     }
// }

// testExecuteLlm();