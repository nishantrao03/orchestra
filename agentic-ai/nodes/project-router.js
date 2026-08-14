import getProjectId from "../utils/project-router.js";
import { END } from "@langchain/langgraph";

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
                executionAgent: "normal-agent",
                prevNode: "project-router",
                nextNode: "normal-agent",
            };
        }

        console.log(
            `[PROJECT ROUTER] Project ${projectId} found. Routing to Role Selection Node.`
        );

        return {
            projectId,
            prevNode: "project-router",
            nextNode: "role-selection",
        };
    } catch (error) {
        console.error(
            "[project-router Execution failed]",
            error
        );

        return {
            prevNode: "project-router",
            nextNode: END,
            errorDuringExecution: true,
        };
    }
}