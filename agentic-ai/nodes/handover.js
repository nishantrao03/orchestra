import getProjectId from "../utils/project-router.js";
import linkProjectToThread from '../../tools/database/thread/link-project-to-thread.js';
import { END } from "@langchain/langgraph";

/**
 * Evaluates the active project ID from the graph state, links it to the current thread record, 
 * populates the cache with the new mapping, and routes the execution to the role selection node.
 *
 * @param {Object} state - The current state of the LangGraph execution.
 * @returns {Promise<Object>} The updated state routing parameters.
 */
export default async function handover(state) {
    console.log("[HANDOVER] Entered Handover Node.");

    try {
        const projectId = state.projectId;

        if (!projectId) {
            console.log(
                "[HANDOVER] No project ID found in state. Ending graph."
            );

            return {
                prevNode: "handover",
                nextNode: END,
            };
        }

        console.log(
            `[HANDOVER] Project ${projectId} found in state. Linking to thread and updating cache.`
        );

        await linkProjectToThread({
            projectId: projectId,
            threadId: state.threadId,
        });

        await getProjectId({
            channelId: state.channelId,
            threadId: state.threadId,
        });

        console.log(
            `[HANDOVER] Project ${projectId} successfully linked and cached. Routing to Role Selection Node.`
        );

        return {
            projectId,
            prevNode: "handover",
            nextNode: "role-selection",
        };
    } catch (error) {
        console.error(
            "[handover Execution failed]",
            error
        );

        return {
            prevNode: "handover",
            nextNode: END,
            errorDuringExecution: true,
        };
    }
}