import { END } from "@langchain/langgraph";

import memberAgentExecution from "../agents/member-agent.js";

export default async function memberAgent(state) {
    console.log("Entered Member Agent Node");

    try {
        const response =
            await memberAgentExecution();

        const nextNode =
            Number(
                response.choices[0].message.content
                    .trim()
            );
        

        switch (nextNode) {
            case 1:
                return {
                    nextNode: END,
                };

            default:
                throw new Error(
                    `Invalid Member Agent route: ${nextNode}`
                );
        }
    } catch (error) {
        console.error(
            "[MEMBER AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}
