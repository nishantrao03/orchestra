import dbAgentExecution from "../agents/db-agent.js";

export default async function dbAgent(state) {
    console.log("Entered DB Agent Node");

    try {
        const response =
            await dbAgentExecution();

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
                    `Invalid DB Agent route: ${nextNode}`
                );
        }
    } catch (error) {
        console.error(
            "[DB AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}
