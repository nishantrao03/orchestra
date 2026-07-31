import { callGemini } from "../../ai/gemini-helpers/gemini-call-helper.js";

import slackAgentPrompt from "../../prompts/agents/slack-agent-prompt.js";

export default async function slackAgent() {
    try {
        const messages = [
            {
                role: "system",
                content: slackAgentPrompt(),
            },
            {
                role: "user",
                content: "Return the number.",
            },
        ];

        const response =
            await callGemini(messages);

        console.log("[SLACK AGENT] Response:", response.model, response.choices[0].message.content);

        return response;
    } catch (error) {
        console.error(
            "[SLACK AGENT] Execution failed.",
            error
        );

        throw error;
    }
}
