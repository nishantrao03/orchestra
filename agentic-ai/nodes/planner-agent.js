import plannerAgentExecution from "../agents/planner-agent.js";

export default async function plannerAgent(state) {
    console.log("Entered Planner Agent Node");

    try {
        const subtasksList = await plannerAgentExecution({
            userMessage: state.userMessage,
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
            subtasksMetadata: subtasksList,
            currentSubtaskIndex: 0,
            nextNode: nextNodeTarget,
            prevNode: "planner-agent",
        };
    } catch (error) {
        console.error(
            "[PLANNER AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}