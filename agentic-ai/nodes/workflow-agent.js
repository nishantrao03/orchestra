import workflowAgentExecution from "../agents/workflow-agent.js";

export default async function workflowAgent(state) {
    console.log("Entered Workflow Agent Node");

    try {
        const response =
            await workflowAgentExecution();

        const nextNode =
            Number(
                response.choices[0].message.content
                    .trim()
            );

        switch (nextNode) {
            case 1:
                return {
                    nextNode: "manager-agent",
                };

            default:
                throw new Error(
                    `Invalid Workflow Agent route: ${nextNode}`
                );
        }
    } catch (error) {
        console.error(
            "[WORKFLOW AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}
