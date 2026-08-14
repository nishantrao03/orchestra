import workflowAgentExecution from "../agents/workflow-agent.js";
import { END } from "@langchain/langgraph";

/**
 * Extracts the current subtask from the graph state, invokes the workflow agent, 
 * and updates the state with execution results, routing flags, and continuation status.
 * Ensures continuation is maintained and subtask index remains unchanged if atomic tools are required.
 *
 * @param {Object} state - The current state of the LangGraph execution.
 * @returns {Promise<Object>} The updated state parameters to be merged into the graph.
 */
export default async function workflowAgent(state) {
    console.log("Entered Workflow Agent Node");

    try {
        const subtasksList = state.subtasksMetadata || [];
        const currentIndex = state.currentSubtaskIndex || 0;

        if (currentIndex >= subtasksList.length) {
            throw new Error(`Subtask index ${currentIndex} is out of bounds.`);
        }

        const currentSubtaskText = subtasksList[currentIndex].subtask;

        const executionResult = await workflowAgentExecution({
            currentSubtaskText: currentSubtaskText,
            messages: state.messages,
            projectId: state.projectId
        });

        const finalContinueExecution = executionResult.requiresAtomicTools 
            ? true 
            : executionResult.continueExecution;

        const nextSubtaskIndex = executionResult.requiresAtomicTools
            ? currentIndex
            : currentIndex + 1;

        return {
            messages: executionResult.messages,
            requiresAtomicTools: executionResult.requiresAtomicTools,
            continueExecution: finalContinueExecution,
            currentSubtaskIndex: nextSubtaskIndex,
            prevNode: "workflow-agent",
            nextNode: "manager-orchestrator",
        };
    } catch (error) {
        console.error(
            "[WORKFLOW AGENT NODE] Execution failed.",
            error
        );

        return {
            prevNode: "workflow-agent",
            nextNode: END,
            errorDuringExecution: true,
        };
    }
}