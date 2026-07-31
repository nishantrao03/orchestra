import plannerAgentExecution from "../agents/planner-agent.js";

export default async function plannerAgent(state) {
    console.log("Entered Planner Agent Node");

    try {
        const response =
            await plannerAgentExecution();

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
                    `Invalid Planner Agent route: ${nextNode}`
                );
        }
    } catch (error) {
        console.error(
            "[PLANNER AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}
