import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import memberAgentPrompt from "../../prompts/agents/member-agent-prompt.js";

export default async function memberAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: memberAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[MEMBER AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[MEMBER AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
