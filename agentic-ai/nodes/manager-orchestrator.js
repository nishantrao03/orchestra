import { END } from "@langchain/langgraph";

export default async function managerOrchestrator(state) {
    console.log("Entered Manager Orchestrator Node");

    try {
        const prevNode = state.prevNode;

        switch (prevNode) {
            case "role-selection":
                return {
                    nextNode: "planner-agent",
                    prevNode: "manager-orchestrator",
                };

            case "planner-agent":
                return {
                    nextNode: "workflow-agent",
                    prevNode: "manager-orchestrator",
                };

            case "workflow-agent":
                if (!state.executedByWorkflowAgent) {
                    return {
                        nextNode: "tools-agent",
                        prevNode: "manager-orchestrator",
                    };
                }

                if (state.currentSubtaskIndex < state.subtasksMetadata.length) {
                    return {
                        nextNode: "workflow-agent",
                        prevNode: "manager-orchestrator",
                    };
                }

                return {
                    nextNode: "response-agent",
                    prevNode: "manager-orchestrator",
                };

            case "tools-agent":
                if (state.currentSubtaskIndex < state.subtasksMetadata.length) {
                    return {
                        nextNode: "workflow-agent",
                        prevNode: "manager-orchestrator",
                    };
                }

                return {
                    nextNode: "response-agent",
                    prevNode: "manager-orchestrator",
                };

            case "response-agent":
                return {
                    nextNode: END,
                    prevNode: "manager-orchestrator",
                };

            default:
                throw new Error(
                    `Invalid Manager Orchestrator route: ${prevNode}`
                );
        }
    } catch (error) {
        console.error(
            "[MANAGER ORCHESTRATOR NODE] Execution failed.",
            error
        );

        throw error;
    }
}