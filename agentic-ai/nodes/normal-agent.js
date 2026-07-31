import { END } from "@langchain/langgraph";

import normalAgentExecution from "../agents/normal-agent.js";

export default async function normalAgent(state) {
    console.log("Entered Normal Agent Node");

    try {
        const response =
            await normalAgentExecution();

        const nextNode =
            Number(
                response.choices[0].message.content
                    .trim()
            );
        

        switch (nextNode) {
            case 1:
                return {
                    nextNode: "handover",
                };

            case 2:
                return {
                    nextNode: END,
                };

            default:
                throw new Error(
                    `Invalid Normal Agent route: ${nextNode}`
                );
        }
    } catch (error) {
        console.error(
            "[NORMAL AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}
