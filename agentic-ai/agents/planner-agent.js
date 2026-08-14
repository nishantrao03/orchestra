import executeLlm from "../utils/llm-execution.js";
import plannerAgentPrompt from "../../prompts/agents/planner-agent-prompt.js";
import getManagerAgentPlannerTools from "../../tools-implementation/tool-lists/manager-agent-tools.js";
import getMemberAgentPlannerTools from "../../tools-implementation/tool-lists/member-agent-tools.js";

/**
 * Evaluates the user's task and breaks it down into actionable subtasks mapped to available tools.
 * Incorporates the project ID context into the planning prompt.
 *
 * @param {Object} params - The execution parameters.
 * @param {string} params.userMessage - The main task provided by the user.
 * @param {Array<Object>} params.messages - The conversation history.
 * @param {string} params.agent - The identifier of the orchestrator requesting the plan.
 * @param {string} params.projectId - The unique identifier of the active project.
 * @returns {Promise<{subtasksArray: Array, messages: Array}>} The generated subtasks and updated state messages.
 */
export default async function plannerAgentExecution({ userMessage, messages = [], agent, projectId }) {
    try {
        let plannerTools;
        
        if (agent === "manager-orchestrator") {
            plannerTools = getManagerAgentPlannerTools();
        } else if (agent === "member-orchestrator") {
            plannerTools = getMemberAgentPlannerTools();
        } else {
            throw new Error(`Invalid agent provided for planner tool selection: ${agent}`);
        }

        const systemPrompt = plannerAgentPrompt(plannerTools, projectId);
        const userPrompt = `Please break down the following task into a logical sequence of subtasks: "${userMessage}"`;

        const responseFormat = {
            type: "json_schema",
            json_schema: {
                name: "subtasks_list",
                schema: {
                    type: "object",
                    properties: {
                        subtasks: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    subtask: {
                                        type: "string",
                                    },
                                },
                                required: ["subtask"],
                            },
                        },
                    },
                    required: ["subtasks"],
                },
            },
        };

        const result = await executeLlm(
            systemPrompt,
            userPrompt,
            null, 
            responseFormat,
            messages
        );

        if (!result.success) {
            throw new Error(result.error || "LLM execution failed inside the helper.");
        }

        const parsedContent = JSON.parse(result.finalResponse);
        const subtasksArray = parsedContent.subtasks;

        console.log("[PLANNER AGENT] Extracted Array:", subtasksArray);

        return {
            subtasksArray: subtasksArray,
            messages: result.messages
        };
    } catch (error) {
        console.error(
            "[PLANNER AGENT] Execution failed.",
            error
        );

        throw error;
    }
}

/**
 * Executes an independent test for the plannerAgent function to validate subtask extraction.
 */
async function testPlannerAgent() {
    console.log("Running plannerAgent independent test...");
    
    const mockState = {
        userMessage: "Store this document for the project id pid11 for future retrieval.",
        messages: [],
        agent: "manager-orchestrator",
        projectId: "pid11"
    };

    try {
        const result = await plannerAgentExecution(mockState);
        
        if (result && Array.isArray(result.subtasksArray)) {
            console.log("\nTest successful. Extracted JSON Array:");
            console.dir(result.subtasksArray, { depth: null });
            
            console.log("\nUpdated Messages Object:");
            console.dir(result.messages, { depth: null });
        } else {
            console.error("\nTest failed: Invalid response format.");
        }
    } catch (error) {
        console.error("\nTest encountered an error:", error);
    }
}

// testPlannerAgent();