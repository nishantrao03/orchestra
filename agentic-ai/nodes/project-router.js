import getProjectId from "../utils/project-router.js";

export default async function projectRouter(state) {
    console.log("[PROJECT ROUTER] Entered Project Router Node.");

    try {
        const projectId = await getProjectId({
            channelId: state.channelId,
            threadId: state.threadId,
        });

        if (!projectId) {
            console.log(
                `[PROJECT ROUTER] No project found for channel ${state.channelId}. Routing to Normal Agent Node.`
            );

            return {
                nextNode: "normal-agent",
            };
        }

        console.log(
            `[PROJECT ROUTER] Project ${projectId} found. Routing to Role Selection Node.`
        );

        return {
            projectId,
            nextNode: "role-selection",
        };
    } catch (error) {
        console.error(
            `[PROJECT ROUTER] Failed to resolve project for channel ${state.channelId}. Routing to Normal Agent Node.`,
            error
        );

        return {
            nextNode: "normal-agent",
        };
    }
}