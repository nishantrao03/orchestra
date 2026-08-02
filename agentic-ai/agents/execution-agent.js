import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import executionAgentPrompt from "../../prompts/agents/execution-agent-prompt.js";

export default async function executionAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: executionAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[EXECUTION AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[EXECUTION AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
