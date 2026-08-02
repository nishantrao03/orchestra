import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import responseAgentPrompt from "../../prompts/agents/response-agent-prompt.js";

export default async function responseAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: responseAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[RESPONSE AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[RESPONSE AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
