import { END } from "@langchain/langgraph";

/**
 * Determines the next node in the manager workflow based on the previous execution state, 
 * subtask progress, and tool requirements.
 * 
 * @param {Object} state - The current state of the LangGraph execution.
 * @returns {Promise<Object>} The updated routing parameters.
 */
export default async function managerOrchestrator(state) {
    console.log("Entered Manager Orchestrator Node");

    try {
        const prevNode = state.prevNode;
        const continueExecution = state.continueExecution;
        const currentSubtaskIndex = state.currentSubtaskIndex;
        const subtasksMetadata = state.subtasksMetadata || [];
        const requiresAtomicTools = state.requiresAtomicTools;

        switch (prevNode) {
            case "role-selection":
                return {
                    nextNode: "planner-agent",
                    prevNode: "manager-orchestrator",
                };

            case "planner-agent": 
                if (continueExecution) {
                    return {
                        nextNode: "workflow-agent",
                        prevNode: "manager-orchestrator",
                    };
                }
                return {
                    nextNode: "response-agent",
                    prevNode: "manager-orchestrator",
                };

            case "workflow-agent": 
                if (currentSubtaskIndex < subtasksMetadata.length && continueExecution) {
                    if (requiresAtomicTools) {
                        return {
                            nextNode: "tools-agent",
                            prevNode: "manager-orchestrator",
                        };
                    } else {
                        return {
                            nextNode: "workflow-agent",
                            prevNode: "manager-orchestrator",
                        };
                    }
                }
                
                return {
                    nextNode: "response-agent",
                    prevNode: "manager-orchestrator",
                };

            case "tools-agent":
                if (currentSubtaskIndex < subtasksMetadata.length && continueExecution) {
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
            "[manager-orchestrator Execution failed]",
            error
        );

        return {
            nextNode: END,
            prevNode: "manager-orchestrator",
            errorDuringExecution: true,
        };
    }
}