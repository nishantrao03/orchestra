import contextAgentExecution from "../agents/context-agent.js";

export default async function contextAgent(state) {
    console.log("Entered Context Agent Node");

    try {
        const response =
            await contextAgentExecution();

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
                    `Invalid Context Agent route: ${nextNode}`
                );
        }
    } catch (error) {
        console.error(
            "[CONTEXT AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}
