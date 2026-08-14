import toolsAgentExecution from "../agents/tools-agent.js";
import { END } from "@langchain/langgraph";

/**
 * Extracts the current subtask from the graph state, invokes the tools agent, 
 * and updates the state with execution results, routing flags, and the incremented subtask index.
 *
 * @param {Object} state - The current state of the LangGraph execution.
 * @returns {Promise<Object>} The updated state parameters to be merged into the graph.
 */
export default async function toolsAgent(state) {
    console.log("Entered Tools Agent Node");

    try {
        const subtasksList = state.subtasksMetadata || [];
        const currentIndex = state.currentSubtaskIndex || 0;

        if (currentIndex >= subtasksList.length) {
            throw new Error(`Subtask index ${currentIndex} is out of bounds.`);
        }

        const currentSubtaskText = subtasksList[currentIndex].subtask;

        const executionResult = await toolsAgentExecution({
            currentSubtaskText: currentSubtaskText,
            messages: state.messages,
            projectId: state.projectId
        });

        return {
            messages: executionResult.messages,
            continueExecution: executionResult.continueExecution,
            currentSubtaskIndex: currentIndex + 1,
            prevNode: "tools-agent",
            nextNode: "manager-orchestrator",
        };
    } catch (error) {
        console.error(
            "[TOOLS AGENT NODE] Execution failed.",
            error
        );

        return {
            nextNode: END,
            errorDuringExecution: true,
        };
    }
}