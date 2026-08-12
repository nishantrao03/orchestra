import executeLlm from "../utils/llm-execution.js";
import executionAgentPrompt from "../../prompts/agents/execution-agent-prompt.js";
import memberAgentTools from "../../tools-implementation/documentation/member-agent-documentation.js";

/**
 * Executes a specific subtask by invoking the LLM with appropriate tools and enforcing a strict JSON response format.
 *
 * @param {Object} params - The execution parameters.
 * @param {string} params.currentSubtaskText - The description of the subtask to be executed.
 * @param {Array<Object>} params.messages - The conversation history.
 * @returns {Promise<{success: boolean, continueExecution: boolean, message: string, messages: Array<Object>}>} The execution results and updated conversation history.
 */
export default async function executionAgentExecution({ currentSubtaskText, messages = [] }) {
    try {
        const systemPrompt = executionAgentPrompt();
        const userPrompt = `Please execute the following subtask: "${currentSubtaskText}"`;

        const responseFormat = {
            type: "json_schema",
            json_schema: {
                name: "execution_result",
                schema: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            description: "True if the subtask was successfully completed, false if it failed or cannot be done."
                        },
                        continueExecution: {
                            type: "boolean",
                            description: "True if the orchestrator should move on to the next subtask, false if the workflow should halt."
                        },
                        message: {
                            type: "string",
                            description: "A detailed summary of the actions taken using tools, or a clear explanation of why the task failed or no tools were used."
                        }
                    },
                    required: ["success", "continueExecution", "message"]
                }
            }
        };

        const result = await executeLlm(
            systemPrompt,
            userPrompt,
            memberAgentTools,
            responseFormat,
            messages
        );

        if (!result.success) {
            throw new Error(result.error || "LLM execution failed inside the helper.");
        }

        const parsedContent = JSON.parse(result.finalResponse);

        console.log("[EXECUTION AGENT] Extracted Result:", parsedContent);

        return {
            success: parsedContent.success,
            continueExecution: parsedContent.continueExecution,
            message: parsedContent.message,
            messages: result.messages
        };
    } catch (error) {
        console.error(
            "[EXECUTION AGENT] Execution failed.",
            error
        );

        throw error;
    }
}

/**
 * Executes an independent test for the executionAgent function to validate the tool calling and response formatting logic.
 */
async function testExecutionAgent() {
    console.log("Running executionAgent independent test...");
    
    const mockSubtaskText = "For project id '5e11abfa-ba68-4ea7-8add-242011c9497b', please find when is the last date of submission.";
    const mockMessages = [];

    try {
        const result = await executionAgentExecution({
            currentSubtaskText: mockSubtaskText,
            messages: mockMessages
        });
        
        console.log("\nTest execution finished. Resulting Payload:");
        console.dir(result, { depth: null });
    } catch (error) {
        console.error("\nTest encountered an error:", error);
    }
}

// testExecutionAgent();