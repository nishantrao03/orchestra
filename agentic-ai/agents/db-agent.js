import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import dbAgentPrompt from "../../prompts/agents/db-agent-prompt.js";

export default async function dbAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: dbAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[DB AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[DB AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
