import responseAgentExecution from "../agents/response-agent.js";
import { END } from "@langchain/langgraph";

/**
 * Extracts the user message and conversation history from the graph state, invokes the response agent, 
 * and updates the state with the final user-facing response and appropriate orchestrator routing.
 *
 * @param {Object} state - The current state of the LangGraph execution.
 * @returns {Promise<Object>} The updated state parameters to be merged into the graph.
 */
export default async function responseAgent(state) {
    console.log("Entered Response Agent Node");

    try {
        const executionResult = await responseAgentExecution({
            userMessage: state.userMessage,
            messages: state.messages || [],
        });

        let nextNodeTarget = state.prevNode;
        if (state.prevNode === "member-orchestrator") {
            nextNodeTarget = "member-orchestrator";
        } else if (state.prevNode === "manager-orchestrator") {
            nextNodeTarget = "manager-orchestrator";
        }

        return {
            messages: executionResult.messages,
            finalResponse: executionResult.response,
            prevNode: "response-agent",
            nextNode: nextNodeTarget,
        };
    } catch (error) {
        console.error(
            "[response-agent Execution failed]",
            error
        );

        return {
            messages: state.messages || [],
            finalResponse: "An error occurred while preparing the response.",
            prevNode: "response-agent",
            nextNode: END,
            errorDuringExecution: true,
        };
    }
}