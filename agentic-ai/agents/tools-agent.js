import executeLlm from "../utils/llm-execution.js";
import toolsAgentPrompt from "../../prompts/agents/tools-agent-prompt.js";
import managerAgentTools from "../../tools-implementation/documentation/manager-agent-tools-documentation.js";

/**
 * Executes a subtask using atomic tools and workflows, returning structured success and continuation states.
 * Incorporates the project ID context into the execution prompt.
 *
 * @param {Object} params - The execution parameters.
 * @param {string} params.currentSubtaskText - The description of the subtask to be executed.
 * @param {Array<Object>} params.messages - The conversation history.
 * @param {string} params.projectId - The unique identifier of the active project.
 * @returns {Promise<{toolsExecutionSuccess: boolean, continueExecution: boolean, message: string, messages: Array<Object>}>} 
 */
export default async function toolsAgentExecution({ currentSubtaskText, messages = [], projectId }) {
    try {
        const systemPrompt = toolsAgentPrompt(projectId);
        const userPrompt = `Please execute this subtask: "${currentSubtaskText}"`;

        const responseFormat = {
            type: "json_schema",
            json_schema: {
                name: "tools_execution_result",
                schema: {
                    type: "object",
                    properties: {
                        toolsExecutionSuccess: {
                            type: "boolean",
                            description: "True if the subtask was successfully completed using tools/workflows, false if it failed."
                        },
                        continueExecution: {
                            type: "boolean",
                            description: "True if the process should advance to the next subtask. False only if execution failures block future subtask dependencies."
                        },
                        message: {
                            type: "string",
                            description: "A detailed summary of the actions taken using tools, or an explanation of why the subtask failed."
                        }
                    },
                    required: ["toolsExecutionSuccess", "continueExecution", "message"]
                }
            }
        };

        const result = await executeLlm(
            systemPrompt,
            userPrompt,
            managerAgentTools,
            responseFormat,
            messages
        );

        if (!result.success) {
            throw new Error(result.error || "LLM execution failed inside the helper.");
        }

        const parsedContent = JSON.parse(result.finalResponse);

        console.log("[TOOLS AGENT] Extracted Result:", parsedContent);

        return {
            toolsExecutionSuccess: parsedContent.toolsExecutionSuccess,
            continueExecution: parsedContent.continueExecution,
            message: parsedContent.message,
            messages: result.messages
        };
    } catch (error) {
        console.error(
            "[TOOLS AGENT] Execution failed.",
            error
        );

        throw error;
    }
}

/**
 * Executes an independent test for the toolsAgentExecution function to validate the planning and execution logic.
 */
async function testToolsAgentExecution() {
    console.log("Running toolsAgentExecution independent test...");
    
    const mockSubtaskText = "Hello, can you please summarize the content of this file for the active project? https://files.slack.com/files-pri/T0ABZA0JHHT-F0B9R6URVMG/download/project_guidelines.pdf";
    const mockMessages = [];
    const mockProjectId = "projectid1";

    try {
        const result = await toolsAgentExecution({
            currentSubtaskText: mockSubtaskText,
            messages: mockMessages,
            projectId: mockProjectId
        });
        
        console.log("\nTest execution finished. Resulting Payload:");
        console.dir(result, { depth: null });
    } catch (error) {
        console.error("\nTest encountered an error:", error);
    }
}

// testToolsAgentExecution();