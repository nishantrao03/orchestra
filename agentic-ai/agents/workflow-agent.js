import executeLlm from "../utils/llm-execution.js";
import workflowAgentPrompt from "../../prompts/agents/workflow-agent-prompt.js";
import workflowTools from "../../tools-implementation/documentation/manager-agent-workflows-documentation.js";

/**
 * Executes a subtask using high-level workflows and evaluates if atomic tool handoff or workflow halting is required.
 *
 * @param {Object} params - The execution parameters.
 * @param {string} params.currentSubtaskText - The description of the subtask to be executed.
 * @param {Array<Object>} params.messages - The conversation history.
 * @returns {Promise<{workflowExecutionSuccess: boolean, requiresAtomicTools: boolean, continueExecution: boolean, message: string, messages: Array<Object>}>} 
 */
export default async function workflowAgentExecution({ currentSubtaskText, messages = [] }) {
    try {
        const systemPrompt = workflowAgentPrompt();
        const userPrompt = `Please execute this subtask: "${currentSubtaskText}"`;

        const responseFormat = {
            type: "json_schema",
            json_schema: {
                name: "workflow_execution_result",
                schema: {
                    type: "object",
                    properties: {
                        workflowExecutionSuccess: {
                            type: "boolean",
                            description: "True if the subtask was successfully completed using workflows, false if it failed or requires atomic tools."
                        },
                        requiresAtomicTools: {
                            type: "boolean",
                            description: "True if the subtask cannot be completed with workflows and requires routing to the atomic tools agent."
                        },
                        continueExecution: {
                            type: "boolean",
                            description: "True if the process should advance to the next subtask. False only if execution failures block future subtask dependencies."
                        },
                        message: {
                            type: "string",
                            description: "A detailed summary of the actions taken using workflows, or an explanation of why the subtask failed or requires atomic tools."
                        }
                    },
                    required: ["workflowExecutionSuccess", "requiresAtomicTools", "continueExecution", "message"]
                }
            }
        };

        const result = await executeLlm(
            systemPrompt,
            userPrompt,
            workflowTools,
            responseFormat,
            messages
        );

        if (!result.success) {
            throw new Error(result.error || "LLM execution failed inside the helper.");
        }

        const parsedContent = JSON.parse(result.finalResponse);

        console.log("[WORKFLOW AGENT] Extracted Result:", parsedContent);

        return {
            workflowExecutionSuccess: parsedContent.workflowExecutionSuccess,
            requiresAtomicTools: parsedContent.requiresAtomicTools,
            continueExecution: parsedContent.continueExecution,
            message: parsedContent.message,
            messages: result.messages
        };
    } catch (error) {
        console.error(
            "[WORKFLOW AGENT] Execution failed.",
            error
        );

        throw error;
    }
}

/**
 * Executes an independent test for the workflowAgentExecution function to validate the planning and execution logic.
 */
async function testWorkflowAgentExecution() {
    console.log("Running workflowAgentExecution independent test...");
    
    // const mockSubtaskText = "For the project with id '5e11abfa-ba68-4ea7-8add-242011c9497b', the user with ID 'U0AC0M1S90W' wants to create the following channels on Slack: spaceship_construction_managers, venus_atmosphere_study_managers, system_control_managers.";
    const mockSubtaskText = "For the project with id '5e11abfa-ba68-4ea7-8add-242011c9497b', the user with ID 'U0AC0M1S90W' wants to create the following channels on Slack: earth_photos_production, earth_photos_managers.";

    const mockMessages = [];

    try {
        const result = await workflowAgentExecution({
            currentSubtaskText: mockSubtaskText,
            messages: mockMessages
        });
        
        console.log("\nTest execution finished. Resulting Payload:");
        console.dir(result, { depth: null });
    } catch (error) {
        console.error("\nTest encountered an error:", error);
    }
}

// testWorkflowAgentExecution();