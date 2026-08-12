import plannerAgentExecution from "../agents/planner-agent.js";

/**
 * Executes the planner agent to break down user requests into subtasks and determines the next routing node.
 * 
 * @param {Object} state - The current state of the LangGraph execution.
 * @returns {Promise<Object>} The updated state parameters to be merged into the graph.
 */
export default async function plannerAgent(state) {
    console.log("Entered Planner Agent Node");

    try {
        const executionResult = await plannerAgentExecution({
            userMessage: state.userMessage,
            messages: state.messages,
        });

        const callerNode = state.prevNode;
        let nextNodeTarget;

        if (callerNode === "member-orchestrator") {
            nextNodeTarget = "member-orchestrator";
        } else if (callerNode === "manager-orchestrator") {
            nextNodeTarget = "manager-orchestrator";
        } else {
            throw new Error(`Invalid Planner Agent caller route: ${callerNode}`);
        }

        return {
            subtasksMetadata: executionResult.subtasksArray,
            currentSubtaskIndex: 0,
            continueExecution: true,
            nextNode: nextNodeTarget,
            prevNode: "planner-agent",
            messages: executionResult.messages,
        };
    } catch (error) {
        console.error(
            "[PLANNER AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}