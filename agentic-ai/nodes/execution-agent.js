import executionAgentExecution from "../agents/execution-agent.js";

/**
 * Extracts the current subtask from the graph state, invokes the execution agent, 
 * and updates the state with execution results, routing paths, and the incremented subtask index.
 *
 * @param {Object} state - The current state of the LangGraph execution.
 * @returns {Promise<Object>} The updated state parameters to be merged into the graph.
 */
export default async function executionAgent(state) {
    console.log("Entered Execution Agent Node");

    try {
        const subtasksList = state.subtasksMetadata || [];
        const currentIndex = state.currentSubtaskIndex || 0;

        if (currentIndex >= subtasksList.length) {
            throw new Error(`Subtask index ${currentIndex} is out of bounds.`);
        }

        const currentSubtaskText = subtasksList[currentIndex].subtask;

        const executionResult = await executionAgentExecution({
            currentSubtaskText: currentSubtaskText,
            messages: state.messages,
        });

        return {
            messages: executionResult.messages,
            continueExecution: executionResult.continueExecution,
            currentSubtaskIndex: currentIndex + 1,
            prevNode: "execution-agent",
            nextNode: "member-orchestrator",
        };
    } catch (error) {
        console.error(
            "[EXECUTION AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}