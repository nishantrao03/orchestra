import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import toolsAgentPrompt from "../../prompts/agents/tools-agent-prompt.js";

export default async function toolsAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: toolsAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[TOOLS AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[TOOLS AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
