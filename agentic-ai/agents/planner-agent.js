import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import plannerAgentPrompt from "../../prompts/agents/planner-agent-prompt.js";

export default async function plannerAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: plannerAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[PLANNER AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[PLANNER AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
