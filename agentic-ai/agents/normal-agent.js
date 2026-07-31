import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import normalAgentPrompt from "../../prompts/agents/normal-agent-prompt.js";

export default async function normalAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: normalAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[NORMAL AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[NORMAL AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
