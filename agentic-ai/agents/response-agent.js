import executeLlm from "../utils/llm-execution.js";
import responseAgentPrompt from "../../prompts/agents/response-agent-prompt.js";

/**
 * Executes the response agent workflow to formulate a concise, user-facing summary of the execution trajectory.
 *
 * @param {Object} params - The execution parameters.
 * @param {string} params.userMessage - The original message provided by the user.
 * @param {Array<Object>} params.messages - The conversation history containing the execution trajectory.
 * @returns {Promise<{response: string, messages: Array<Object>}>} 
 */
export default async function responseAgentExecution({ userMessage, messages = [] }) {
    try {
        const systemPrompt = responseAgentPrompt();
        const userPrompt = `Please review the execution trajectory for the original user request: "${userMessage}". Based on the actions taken and recorded in the conversation history, formulate the final user-facing response.`;

        const result = await executeLlm(
            systemPrompt,
            userPrompt,
            null,
            null,
            messages
        );

        if (!result.success) {
            throw new Error(result.error || "LLM execution failed inside the helper.");
        }

        console.log("[RESPONSE AGENT] Formulated Response:", result.finalResponse);

        return {
            response: result.finalResponse,
            messages: result.messages
        };
    } catch (error) {
        console.error(
            "[RESPONSE AGENT] Execution failed.",
            error
        );

        throw error;
    }
}

/**
 * Executes an independent test for the responseAgentExecution function to validate summarization and constraints.
 */
async function testResponseAgentExecution() {
    console.log("Running responseAgentExecution independent test...");
    
    const mockUserMessage = "For the project with id 'projectid1', remove the user abc@xyz.com from every channel that he is a part of. Also remove him from the project.";
    const mockMessages = [
    {
        role: 'user',
        content: "For the project with id 'projectid1', remove the user abc@xyz.com from every channel that he is a part of. Also remove him from the project."
    },
    {
        role: 'assistant',
        tool_calls: [
            {
                id: 'call_abc123',
                type: 'function',
                function: {
                    name: 'find-users-by-email-tool',
                    arguments: '{"emails":["abc@xyz.com"]}'
                }
            }
        ]
    },
    {
        role: 'tool',
        tool_call_id: 'call_abc123',
        content: '{"success":true,"result":{"abc@xyz.com":"U12345678"},"error":null}'
    },
    {
        role: 'assistant',
        tool_calls: [
            {
                id: 'call_def456',
                type: 'function',
                function: {
                    name: 'remove-members-from-project-workflow',
                    arguments: '{"projectId":"projectid1","userIds":["U12345678"]}'
                }
            }
        ]
    },
    {
        role: 'tool',
        tool_call_id: 'call_def456',
        content: '{"success":true,"result":"User(s) successfully removed from the project and all associated channels.","error":null}'
    }
];

    try {
        const result = await responseAgentExecution({
            userMessage: mockUserMessage,
            messages: mockMessages
        });
        
        console.log("\nTest execution finished. Resulting Payload:");
        console.dir(result, { depth: null });
    } catch (error) {
        console.error("\nTest encountered an error:", error);
    }
}

// testResponseAgentExecution();