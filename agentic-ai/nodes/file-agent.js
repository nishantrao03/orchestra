import fileAgentExecution from "../agents/file-agent.js";

export default async function fileAgent(state) {
    console.log("Entered File Agent Node");

    try {
        const response =
            await fileAgentExecution();

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
                    `Invalid File Agent route: ${nextNode}`
                );
        }
    } catch (error) {
        console.error(
            "[FILE AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}
