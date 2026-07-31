import getProjectId from "../utils/project-router.js";
import { END } from "@langchain/langgraph";

export default async function handover(state) {
    console.log("[HANDOVER] Entered Handover Node.");

    try {
        const projectId = await getProjectId({
            channelId: state.channelId,
            threadId: state.threadId,
        });

        if (!projectId) {
            console.log(
                `[HANDOVER] No project found for channel ${state.channelId}. Ending graph.`
            );

            return {
                nextNode: END,
            };
        }

        console.log(
            `[HANDOVER] Project ${projectId} found. Routing to Role Selection Node.`
        );

        return {
            projectId,
            nextNode: "role-selection",
        };
    } catch (error) {
        console.error(
            `[HANDOVER] Failed to resolve project for channel ${state.channelId}. Ending graph.`,
            error
        );

        return {
            nextNode: END,
        };
    }
}
