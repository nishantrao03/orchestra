import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import contextAgentPrompt from "../../prompts/agents/context-agent-prompt.js";

export default async function contextAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: contextAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[CONTEXT AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[CONTEXT AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
