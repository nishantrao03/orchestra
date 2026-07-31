import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import workflowAgentPrompt from "../../prompts/agents/workflow-agent-prompt.js";

export default async function workflowAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: workflowAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[WORKFLOW AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[WORKFLOW AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
