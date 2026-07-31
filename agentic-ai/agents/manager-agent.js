import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import managerAgentPrompt from "../../prompts/agents/manager-agent-prompt.js";

export default async function managerAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: managerAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[MANAGER AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[MANAGER AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
