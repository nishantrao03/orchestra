import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import fileAgentPrompt from "../../prompts/agents/file-agent-prompt.js";

export default async function fileAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: fileAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[FILE AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[FILE AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
