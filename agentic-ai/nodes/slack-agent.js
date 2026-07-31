import slackAgentExecution from "../agents/slack-agent.js";

export default async function slackAgent(state) {
    console.log("Entered Slack Agent Node");

    try {
        const response =
            await slackAgentExecution();

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
                    `Invalid Slack Agent route: ${nextNode}`
                );
        }
    } catch (error) {
        console.error(
            "[SLACK AGENT NODE] Execution failed.",
            error
        );

        throw error;
    }
}
