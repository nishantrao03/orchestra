import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import plannerAgentPrompt from "../../prompts/agents/planner-agent-prompt.js";

export default async function plannerAgent({ userMessage }) {
    try {
        const messages = [
            {
                role: "system",
                content: plannerAgentPrompt(),
            },
            {
                role: "user",
                content: userMessage,
            },
        ];

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

        const response = await callGemini(messages, null, false, responseFormat);

        const parsedContent = JSON.parse(response.choices[0].message.content);
        const subtasksArray = parsedContent.subtasks;

        console.log("[PLANNER AGENT] Extracted Array:", subtasksArray);

        return subtasksArray;
    } catch (error) {
        console.error(
            "[PLANNER AGENT] Execution failed.",
            error
        );

        throw error;
    }
}

async function testPlannerAgent() {
    console.log("Running plannerAgent independent test...");
    
    const mockState = {
        userMessage: "Add abc@domain.com to the project and post a message on the Mosers Official channel regarding him joining as the QA Lead."
    };

    try {
        const result = await plannerAgent(mockState);
        
        if (Array.isArray(result)) {
            console.log("\nTest successful. Extracted JSON Array:");
            console.dir(result, { depth: null });
        } else {
            console.error("\nTest failed: Invalid response format.");
        }
    } catch (error) {
        console.error("\nTest encountered an error:", error);
    }
}

testPlannerAgent();