import { END } from "@langchain/langgraph";

import managerAgentExecution from "../agents/manager-agent.js";

export default async function managerAgent(state) {
    console.log("Entered Manager Agent Node");

    try {
        const managerAgentCounter =
            state.managerAgentCounter ??
            0;

        if (
            managerAgentCounter >=
            2
        ) {
            console.log(
                "Manager Agent counter limit reached. Navigating to END."
            );

            return {
                nextNode: END,
            };
        }

        const response =
            await managerAgentExecution();

        const updatedManagerAgentCounter =
            managerAgentCounter +
            1;

        const nextNode =
            Number(
                response.choices[0].message.content
                    .trim()
            );
        

        switch (nextNode) {
            case 1:
                return {
                    nextNode: "slack-agent",
                    managerAgentCounter:
                        updatedManagerAgentCounter,
                };

            case 2:
                return {
                    nextNode: "db-agent",
                    managerAgentCounter:
                        updatedManagerAgentCounter,
                };

            case 3:
                return {
                    nextNode: "file-agent",
                    managerAgentCounter:
                        updatedManagerAgentCounter,
                };

            case 4:
                return {
                    nextNode: "context-agent",
                    managerAgentCounter:
                        updatedManagerAgentCounter,
                };

            case 5:
                return {
                    nextNode: "workflow-agent",
                    managerAgentCounter:
                        updatedManagerAgentCounter,
                };

            case 6:
                return {
                    nextNode: "planner-agent",
                    managerAgentCounter:
                        updatedManagerAgentCounter,
                };

            case 7:
                return {
                    nextNode: END,
                    managerAgentCounter:
                        updatedManagerAgentCounter,
                };

            default:
                throw new Error(
                    `Invalid Manager Agent route: ${nextNode}`
                );
        }
    } catch (error) {
        console.error(
            "[MANAGER AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}
