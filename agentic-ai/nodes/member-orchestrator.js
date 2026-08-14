import { END } from "@langchain/langgraph";

/**
 * Determines the next node in the member workflow based on the previous execution state, 
 * subtask progress, and execution continuation flags.
 * 
 * @param {Object} state - The current state of the LangGraph execution.
 * @returns {Promise<Object>} The updated routing parameters.
 */
export default async function memberOrchestrator(state) {
    console.log("Entered Member Orchestrator Node");

    try {
        const prevNode = state.prevNode;
        const continueExecution = state.continueExecution;
        const currentSubtaskIndex = state.currentSubtaskIndex;
        const subtasksMetadata = state.subtasksMetadata || [];

        switch (prevNode) {
            case "role-selection":
                return {
                    nextNode: "planner-agent",
                    prevNode: "member-orchestrator",
                };

            case "planner-agent": 
                if (continueExecution) {
                    return {
                        nextNode: "execution-agent",
                        prevNode: "member-orchestrator",
                    };
                }
                return {
                    nextNode: "response-agent",
                    prevNode: "member-orchestrator",
                };

            case "execution-agent": 
                if (currentSubtaskIndex < subtasksMetadata.length && continueExecution) {
                    return {
                        nextNode: "execution-agent",
                        prevNode: "member-orchestrator",
                    };
                }
                
                return {
                    nextNode: "response-agent",
                    prevNode: "member-orchestrator",
                };

            case "response-agent":
                return {
                    nextNode: END,
                    prevNode: "member-orchestrator",
                };

            default:
                throw new Error(
                    `Invalid Member Orchestrator route: ${prevNode}`
                );
        }
    } catch (error) {
        console.error(
            "[member-orchestrator Execution failed]",
            error
        );

        return {
            nextNode: END,
            prevNode: "member-orchestrator",
            errorDuringExecution: true,
        };
    }
}