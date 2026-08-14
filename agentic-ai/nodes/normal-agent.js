import normalAgentExecution from "../agents/normal-agent.js";
import { END } from "@langchain/langgraph";

/**
 * Extracts the user message and conversation history from the graph state, invokes the normal agent, 
 * and conditionally updates the state based on whether the project ID was successfully finalized.
 *
 * @param {Object} state - The current state of the LangGraph execution.
 * @returns {Promise<Object>} The updated state parameters to be merged into the graph.
 */
export default async function normalAgent(state) {
    console.log("Entered Normal Agent Node");

    try {
        const executionResult = await normalAgentExecution({
            userMessage: state.userMessage,
            messages: state.messages || [],
        });

        const stateUpdate = {
            messages: executionResult.messages,
            prevNode: "normal-agent",
            nextNode: "handover",
        };

        if (executionResult.projectID === null) {
            stateUpdate.finalResponse = executionResult.message;
        } else {
            stateUpdate.projectId = executionResult.projectID;
            stateUpdate.handoverTask = executionResult.handoverTask;
        }

        return stateUpdate;
    } catch (error) {
        console.error(
            "[NORMAL AGENT NODE] Execution failed.",
            error
        );

        return {
            prevNode: "normal-agent",
            nextNode: END,
            errorDuringExecution: true,
        };
    }
}